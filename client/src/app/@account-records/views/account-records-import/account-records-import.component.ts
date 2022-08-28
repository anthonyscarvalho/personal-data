import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { DropDownOptionsModel } from '@common/interfaces';
// modules
import { AccountRecordModel } from '@accountRecords/interfaces';
import { AccountTypes } from '@accountRecords/enums';
import { BankAccountModel } from '@bankAccounts/interfaces';

@Component({
	selector: `acc-account-records-import`,
	templateUrl: `./account-records-import.component.html`,
	styleUrls: [`./account-records-import.component.scss`]
})
export class AccountRecordsImportComponent implements OnInit {
	@ViewChild(`form`) form: NgForm;
	@ViewChild(`uploader`, { read: ElementRef }) uploader: ElementRef;
	// @ViewChild(`filePicker`) _file: ElementRef;

	megaMenu: any;
	submitted = false;

	recordOrder: number = 0;
	accountNumber: string;
	csvType: number;
	parentId: string;
	accountRecords = [];
	bankAccounts: BankAccountModel[];
	accounts: DropDownOptionsModel;
	account: BankAccountModel;

	dataRows = 0;
	totalCount = 0;
	addedRecords = 0;
	existingRecords = 0;
	errorRecords = 0;
	removedRecords = 0;
	duplicateRecords = 0;
	csvTextData: string;

	// paginator
	totalRecords: number;
	itemsPerPage = 10;
	currentPage = 1;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService,
	) {
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit(): void {
		this._generalService.setTitle(`Account Records: Import`);
		this.accounts = {
			label: `Accounts`,
			options: [{
				label: `Please select`,
				value: ``
			}]
		};
		this.loadAccounts();
	}

	loadAccounts() {
		this._httpService.post(`bank-accounts/viewAll`, {}).then((results: any) => {
			if (results.status === `00`) {
				this.bankAccounts = results.data;
				results.data.map(account => {
					this.accounts.options.push({
						label: account.accountDescription,
						value: account._id
					});
				});
			}
		});
	}

	lastOrder(pEvent) {
		if (!this.account) {
			this._notificationsService.warn(`Please select account first.`);
			return;
		}
		this._httpService.post(`bank-account-records/last-record/${this.account._id}`, {}).then((results: any) => {
			if (results.status === `00`) {
				if (results.data === 0 || Number(results.data)) {
					this.recordOrder = (results.data) + 1;
				} else {
					this.recordOrder = 0;
				}
				this.processRecords(pEvent);
			}
		});
	}

	updateAccount(pEvent) {
		if (pEvent) {
			const account = this.bankAccounts.find(_account => _account._id === pEvent);
			if (account) {
				this.account = account;
			}
		}
	}

	processRecords(pEvent) {
		if (pEvent) {
			this.accountRecords = [];
			const csvType = parseFloat(this.account.csvType);
			const files: { [key: string]: File } = pEvent;
			const _totalFiles = Number(files.length);

			this.totalCount = 0;
			this.totalRecords = 0;
			this.resetCounters();

			for (let a = 0; a < _totalFiles; a++) {
				const reader = new FileReader();
				reader.readAsText(files[a]);

				reader.onload = () => {
					const csvData = reader.result;
					const _tmpFile = (csvData as string).split(/\r\n|\n/);
					if (_tmpFile) {
						if (this.account.csvType === '1') {
							_tmpFile.reverse();
						}
						const statementId: string = null;

						_tmpFile.forEach(pRecord => {
							const currentRecord = (pRecord as string).split(`,`);
							let _tmpAmount = null;
							let _tmpCredit = null;
							let _tmpDebit = null;
							let _tmpBalance = null;
							let _tmpDescription = null;
							let _tmpDate1 = null;
							let _tmpDate2 = null;
							let _tmpServiceFee = false;

							if (currentRecord[0].includes(`Account`)) {
								return null;
							}
							else if (currentRecord[0].includes(`Statement Number`)) {
								return null;
							}
							else if (currentRecord[0].includes(`Description`)) {
								return null;
							}
							else if (currentRecord[0] === ``) {
								return null;
							}
							else if (currentRecord.length >= 4) {
								switch (Number(csvType)) {
									case AccountTypes.Fnb:
										_tmpAmount = (currentRecord[1] ? this.convertNumber(currentRecord[1]) : null);
										_tmpDate1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmpCredit = (_tmpAmount && _tmpAmount > 0 ? _tmpAmount : null);
										_tmpDebit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
										_tmpBalance = (currentRecord[2] ? this.convertNumber(currentRecord[2]) : 0.00);
										_tmpDescription = (currentRecord[3] ? this.replaceText(currentRecord[3]) : null);
										break;
									case AccountTypes.NedBank:
										console.log(currentRecord);
										_tmpAmount = (currentRecord[2] ? this.convertNumber(currentRecord[2]) : 0.00);
										_tmpDate1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmpDescription = (currentRecord[1] ? this.replaceText(currentRecord[1]) : null);
										_tmpCredit = (_tmpAmount && _tmpAmount > 0 ? _tmpAmount : 0.00);
										_tmpDebit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);
										_tmpBalance = (currentRecord[3] ? this.convertNumber(currentRecord[3]) : 0.00);
										_tmpServiceFee = (currentRecord[4] ? (currentRecord[4].trim() === `#` ? true : false) : false);
										break;
									case AccountTypes.NedBankCredit:
										_tmpAmount = (currentRecord[5] ? this.convertNumber(currentRecord[5]) : 0.00);
										_tmpDate1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmpDate2 = (currentRecord[1] ? this.convertDate(currentRecord[1].trim()) : null);
										_tmpDescription = (currentRecord[2] ? this.replaceText(currentRecord[2]) : null);
										// blank space
										// blank space
										_tmpCredit = (_tmpAmount && _tmpAmount > 0 ? _tmpAmount : 0.00);
										_tmpDebit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);
										break;
									case AccountTypes.NedBankLoan:
										_tmpAmount = (currentRecord[5] ? this.convertNumber(currentRecord[2]) : 0.00);
										_tmpDate1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmpDescription = (currentRecord[1] ? this.replaceText(currentRecord[1]) : null);
										_tmpCredit = (_tmpAmount && _tmpAmount > 0 ? _tmpAmount : 0.00);
										_tmpDebit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);
										_tmpBalance = (currentRecord[3] ? this.convertNumber(currentRecord[3]) : 0.00);
										break;
									case AccountTypes.NedBankInvestment:
										_tmpDate1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmpDescription = (currentRecord[1] ? this.replaceText(currentRecord[1]) : null);
										_tmpDebit = (currentRecord[2] ? this.convertNumber(currentRecord[2]) : 0.00);
										_tmpCredit = (currentRecord[3] ? this.convertNumber(currentRecord[3]) : 0.00);
										_tmpBalance = (currentRecord[4] ? this.convertNumber(currentRecord[4]) : 0.00);
										break;
								}

								const _tmp: AccountRecordModel = {
									statementId: (statementId ? statementId : null),
									accountsId: this.account._id,
									order: this.recordOrder,
									date1: _tmpDate1,
									date2: _tmpDate2,
									description: _tmpDescription,
									credit: _tmpCredit > 0 ? _tmpCredit : null,
									debit: _tmpDebit !== 0 ? _tmpDebit : null,
									balance: _tmpBalance,
									serviceFee: _tmpServiceFee,
									journal: false,
									comments: ``,
									processed: false,
									originalRecord: ``
								};

								if ((_tmp.date1 && !_tmp.date1.includes(`Date`)) && (_tmp.description && !_tmp.description.includes(`Description`)) && (_tmp.balance.toString() !== ``)) {
									this.totalCount++;
									_tmp.originalRecord = JSON.stringify(currentRecord);
									this.accountRecords.push(_tmp);
								} else {
									// console.log(currentRecord);
								}
								this.recordOrder++;
							}
						});

						this.totalRecords = this.accountRecords.length;
					}
				};

				reader.onerror = () => {
					console.log(`error has occurred while reading file!`);
				};
			}
		}
		const input = this.uploader.nativeElement.querySelector('.inputs__file input');
		input.value = '';
	}

	submit() { }

	uploadRecords() {
		this.resetCounters();

		const updatedRecords = (pRecord) => {
			return new Promise((resolve, reject) => {
				this._httpService.post(`bank-account-records/add`, pRecord).then((pResponse: any) => {
					// this.accountRecords = null;

					switch (pResponse.status) {
						case `00`:
							this._notificationsService.success(pResponse.message);
							this.addedRecords++;
							break;
						case `01`:
							this.errorRecords++;
							this._notificationsService.warn(pResponse.message);
							break;
						case `02`:
							this.errorRecords++;
							this._notificationsService.warn(pResponse.message);
							break;
						case `03`:
							this.duplicateRecords++;
							this._notificationsService.warn(pResponse.message);
							break;
					}
					resolve(pResponse.status);
				});
			});
		};
		Promise.all(this.accountRecords.map(pRecord => {
			updatedRecords(pRecord);
		})).then((pResults: any) => {
			this.accountRecords = [];
			this.resetCounters();
		});
	}

	convertDate(pDate) {
		const _tmpDate = new Date(pDate);
		const _month = _tmpDate.getMonth() + 1;
		const _day = _tmpDate.getDate();
		return _tmpDate.getFullYear() + `-` + ((_month < 10) ? `0` + _month : _month) + `-` + ((_day < 10) ? `0` + _day : _day);
	}

	convertNumber(pNumber) {
		return parseFloat(Number(pNumber.trim()).toFixed(2));
	}

	replaceText(pInput) {
		const doubleSpace = /  +/g;
		const lineBreak = /[\r\n]+/g;

		// use of String replace() Method
		pInput = pInput.replace(doubleSpace, ` `);
		pInput = pInput.replace(lineBreak, ``);
		return pInput.trim();
	}

	resetCounters() {
		this.addedRecords = 0;
		this.duplicateRecords = 0;
		this.errorRecords = 0;
		this.existingRecords = 0;
		this.removedRecords = 0;
	}

	get sortData() {
		return this.accountRecords.sort((a, b) => {
			return (new Date(b.date1) as any) - (new Date(a.date1) as any);
		});
	}

	updatePage(pEvent) { }
}