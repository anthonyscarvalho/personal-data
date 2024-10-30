import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Chart } from 'chart.js/auto';

import { cBankAccount, cBankAccountNumber, cBankAccountDashboard } from "@sharedTypes/classes";
import { CSV_TYPE_CONST, RECORD_STATUSES_CONST } from '@sharedTypes/constants';
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';

@Component({
	selector: `acc-bank-accounts-edit`,
	templateUrl: `./bank-accounts-edit.component.html`,
	styleUrls: [`./bank-accounts-edit.component.scss`]
})
export class BankAccountsEditComponent implements OnInit, AfterViewInit, OnDestroy {
	megaMenu: any;
	bsModalRef: BsModalRef;

	resultRecord: cBankAccount;
	addRecordEventEmitter = false;
	accountDetails: cBankAccountDashboard;
	accountRecords = [];

	accountNumber: number;
	csvType: number;

	submitted = false;
	error = false;

	add = false;

	parentId: string;
	recordBreakdown: cBankAccountNumber;
	breakdownIndex: number;
	breakdownAdd = false;

	private labels = [];
	private chartExpense = [];
	private chartCredit = [];
	private chartBalance = [];

	public filterBoxOptions: IFilterBoxOptions;
	public filterBoxConfig: IFilterBoxConfig = new IFilterBoxConfig();
	public chart: any;

	// select values
	csvTypes;
	recordStatuses;

	constructor(
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef,
		private datePipe: DatePipe,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		this.megaMenu = this.route.snapshot.data.menu;
		if (this.route.snapshot.paramMap.get(`id`)) {
			this.parentId = this.route.snapshot.paramMap.get(`id`);
		} else {
			this.parentId = null;
		}
		this.route.data.subscribe(data => {
			this.add = data.add;
		});
		this.csvTypes = CSV_TYPE_CONST;
		this.recordStatuses = RECORD_STATUSES_CONST;
		this.resultRecord = new cBankAccount(null);
		this.recordBreakdown = new cBankAccountNumber();
	}

	ngOnInit() {
		if (this.parentId) {
			this.load();
			this.loadRecords();
		} else {
			this.resultRecord = new cBankAccount();
			this._generalService.setTitle(`Bank Accounts: Add`);
		}
	}

	submit() {
		this.submitted = true;
		this.error = false;
		const _dateOp = new Date(this.resultRecord.dateOpened);
		this.resultRecord.dateOpened = this.datePipe.transform(_dateOp, `yyyy-MM-dd`);
		if (this.resultRecord.dateClosed && this.resultRecord.dateClosed !== ``) {
			this.resultRecord.dateClosed = this._generalService.formatDate(new Date(this.resultRecord.dateClosed));
		}
		if (!this.add) {
			this._httpService.update(`bank-accounts/update`, this.resultRecord._id, this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === `valid`) {
					this._notificationsService.success(pResult.message);
				} else {
					this._notificationsService.warn(pResult.message);
				}
				setTimeout(() => {
					this.submitted = false;
				}, 500);
			});
		} else {
			this._httpService.post('bank-accounts/add', this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === 'valid') {
					this._notificationsService.success(pResult.message);
					this.resultRecord = null;
				} else {
					this._notificationsService.warn(pResult.message);
				}
			});
		}
	}

	updateValue(pEvent, pModel) {
		this.resultRecord[pModel] = pEvent;
	}

	checkClass(fieldName) {
		if (fieldName.errors) {
			return `is-invalid`;
		} else {
			return `is-valid`;
		}
	}

	load() {
		this._httpService.post(`bank-accounts/edit/` + this.parentId, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.csvType = pResults.data.csvType;
				this.resultRecord = new cBankAccount(pResults.data);
				this._generalService.setTitle(`Bank Accounts: Edit - ` + pResults.data.accountDescription);
				this.loadSum();
			}
		});
	}

	updateBreakdownValue(pEvent, pModel) {
		this.recordBreakdown[pModel] = pEvent;
	}

	addBreakdown() {
		if (this.breakdownIndex === undefined) {
			if (!this.resultRecord.accountNumbers) {
				this.resultRecord.accountNumbers = [];
			}
			if (this.recordBreakdown.number !== ``) {
				this.resultRecord.accountNumbers.push(this.recordBreakdown);
				this.recordBreakdown = new cBankAccountNumber();
				this.breakdownAdd = false;
			}
		} else {
			this.resultRecord.accountNumbers[this.breakdownIndex] = this.recordBreakdown;
			this.recordBreakdown = new cBankAccountNumber();
			this.breakdownIndex = undefined;
			this.breakdownAdd = false;
		}
	}

	editBreakdown(pIndex) {
		this.recordBreakdown = new cBankAccountNumber(this.resultRecord.accountNumbers[pIndex]);
		this.breakdownAdd = true;
		this.breakdownIndex = pIndex;
	}

	removeBreakdown(pIndex) {
		this.resultRecord.accountNumbers.splice(pIndex, 1);
	}

	loadSum() {
		this._httpService.post('bank-account-records/sum/' + this.parentId, {}).then((pRes: any) => {
			if (pRes.status === '00') {
				this.accountDetails = new cBankAccountDashboard(pRes.data);
			}
		});
	}

	loadRecords() {
		this._httpService.post(`bank-account-records/account-records/` + this.parentId, { year: 2024, months: 3 }).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				pResults.data.forEach(record => {
					this.labels.push(record.date1);
					this.chartExpense.push(Math.abs(record.debit));
					this.chartCredit.push(record.credit);
					this.chartBalance.push(record.balance);
				});

				this.createChart();
			}
		});
	}

	convertDate(pDate) {
		const _tmpDate = new Date(pDate);
		return _tmpDate.getFullYear() + `-` + (_tmpDate.getMonth() + 1) + `-` + _tmpDate.getDate();
	}

	formatNumbers(pNumber) {
		return this._generalService.formatNumbers(pNumber, 2);
	}

	updatePage(event: any) {
		this.filterBoxOptions.page = event.page;
		this._generalService.setPage(event.page);
	}

	editAccountRecord() { }

	addTransactions() {
		this._generalService.setModalShowName("addRecordTransaction");
	}

	createChart() {
		this.chart = new Chart('account', {
			type: 'bar',
			data: {
				labels: this.labels,
				datasets: [
					{
						label: "Expense",
						data: this.chartExpense,
						backgroundColor: 'red'
					},
					{
						label: "Credit",
						data: this.chartCredit,
						backgroundColor: 'limegreen'
					},
					{
						label: "Balance",
						data: this.chartBalance,
						backgroundColor: 'blue'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					// Overrides the global setting
					mode: 'index',
					intersect: false
				}
			}

		});
		this.chart.canvas.parentNode.style.height = '300px';
		this.chart.canvas.parentNode.style.width = '100%';
	}

	ngAfterViewInit() {
		this.cdr.detectChanges();
	}

	ngOnDestroy() {
		this._generalService.setModalShowName(false);
	}
}
