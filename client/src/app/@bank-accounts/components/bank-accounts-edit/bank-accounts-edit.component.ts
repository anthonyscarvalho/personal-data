import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IBankAccount, IDashboardBankAccounts, IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';
import { CSV_TYPE, RECORD_STATUSES } from '@common/constants';
// module
import { IAccountRecord } from '@accountRecords/interfaces';

@Component({
	selector: `acc-bank-accounts-edit`,
	templateUrl: `./bank-accounts-edit.component.html`,
	styleUrls: [`./bank-accounts-edit.component.scss`]
})
export class BankAccountsEditComponent implements OnInit, AfterViewInit, OnDestroy {
	megaMenu: any;
	bsModalRef: BsModalRef;

	resultRecord: IBankAccount;
	addRecordEventEmitter = false;
	accountDetails: IDashboardBankAccounts;

	accountNumber: number;
	csvType: number;

	submitted = false;
	error = false;

	add = false;

	parentId: string;
	public filterBoxOptions: IFilterBoxOptions;
	public filterBoxConfig: IFilterBoxConfig;

	// select values
	csvTypes;
	recordStatuses;

	constructor(
		private route: ActivatedRoute,
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
		this.filterBoxConfig = new IFilterBoxConfig();
		this.filterBoxConfig.backLink = `/account-records/view`;
		this.filterBoxConfig.updateControls = true;
		this.route.data.subscribe(data => {
			this.add = data.add;
		});
		this.csvTypes = CSV_TYPE;
		this.recordStatuses = RECORD_STATUSES;
		this.resultRecord = new IBankAccount(null);
	}

	ngOnInit() {
		if (this.parentId) {
			this.load();
		} else {
			this._generalService.setTitle(`Bank Accounts: Add`);
		}
	}

	ngAfterViewInit() { }

	submit() {
		this.submitted = true;
		this.error = false;
		const _dateOp = new Date(this.resultRecord.dateOpened);
		this.resultRecord.dateOpened = this.datePipe.transform(_dateOp, `yyyy-MM-dd`);
		if (this.resultRecord.dateClosed !== ``) {
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
				this.resultRecord = new IBankAccount(pResults.data);
				this._generalService.setTitle(`Bank Accounts: Edit - ` + pResults.data.accountDescription);
				this.loadSum();
			}
		});
	}

	loadSum() {
		this._httpService.post('bank-account-records/sum/' + this.parentId, {}).then((pRes: any) => {
			if (pRes.status === '00') {
				this.accountDetails = new IDashboardBankAccounts(pRes.data);
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

	ngOnDestroy() {
		this._generalService.setModalShowName(false);
	}
}
