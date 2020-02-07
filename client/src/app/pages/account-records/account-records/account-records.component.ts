import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// interfaces
import { AccountRecordsInterface } from '../../../interfaces/accountRecords';
import { AccountsViewInterface } from '../../../interfaces/accounts';
import { FilterBoxConfigInterface, FilterBoxOptionsInterface } from '../../../interfaces/filterBoxOptions';
// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
	selector: 'app-account-records',
	templateUrl: './account-records.component.html',
	styleUrls: ['./account-records.component.scss']
})
export class AccountRecordsComponent implements OnInit {
	@ViewChild('form', { static: false }) form: NgForm;
	@ViewChild('file', { static: false }) _file;

	results: AccountRecordsInterface;
	accounts: AccountsViewInterface[];
	parentId: string;
	accountRecords = [];
	selectedAccount = '';

	dataRows = 0;
	totalCount = 0;
	addedRecords = 0;
	existingRecords = 0;
	removedRecords = 0;
	csvTextData: string;

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
	private filterBoxOptions: FilterBoxOptionsInterface;
	private filterBoxConfig: FilterBoxConfigInterface;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		if (this.route.snapshot.paramMap.get('id')) {
			this.parentId = this.route.snapshot.paramMap.get('id');
		} else {
			this.parentId = null;
		}
		this.bsConfig.containerClass = 'theme-dark-blue';
		this.bsConfig.dateInputFormat = 'YYYY-MM-DD'; // Or format like you want
		this._generalService.setTitle('Account Records: Add New');
		this.filterBoxConfig = new FilterBoxConfigInterface();
		this.filterBoxConfig.backLink = '/account-records/view';
		this.filterBoxConfig.updateControls = true;
	}

	ngOnInit() {
		localStorage.setItem('activeMenu', 'account-records');
		this.filterBoxOptions = new FilterBoxOptionsInterface();

		if (this.parentId) {
			this.load();
		}
		this.getAccounts();
	}

	submit() {
		if (!this.parentId) {
			if (this.results.accountsId !== '') {
				this._httpService.post('accounts/add', this.results).then((pResult: any) => {
					if (pResult.status === '00') {
						this.results = new AccountRecordsInterface();
						this._notificationsService.success(pResult.message);
					} else {
						if (pResult.errors) {
							pResult.errors.forEach(pError => {
								this._notificationsService.warn(pError);
							});
						}
					}
				});
			}
		} else {
			this._httpService.update('accounts/update', this.parentId, this.results).then((pResult: any) => {
				if (pResult.status === '00') {
					this.load();
					this._notificationsService.success(pResult.message);
				} else {
					if (pResult.errors) {
						pResult.errors.forEach(pError => {
							this._notificationsService.warn(pError);
						});
					}
				}
			});
		}
	}

	submitForm() {
		this.form.ngSubmit.emit();
	}

	load() {
		this._httpService.post('accounts/view/' + this.parentId, {}).then((results: any) => {
			if (results.status === '00') {
				this.results = new AccountRecordsInterface(results.data);
				this._generalService.setTitle('Accounts Edit: ' + results.data.accountDescription);
			}
		});
	}

	getAccounts() {
		this._httpService.post('accounts/view/all', {}).then((results: any) => {
			if (results.status === '00') {
				this.accounts = results.data;
			}
		});
	}

	processRecords() {
		this.accountRecords = [];
		this.totalCount = 0;
		this.addedRecords = 0;
		this.existingRecords = 0;
		this.removedRecords = 0;
		this.dataRows = 0;

		const csvRecordsArray = (this.csvTextData as string).split(/\r\n|\n/);

		const totalRecords = csvRecordsArray.length;
		this.totalCount = this.totalCount + Number(totalRecords);
		let accountsId = '';
		let statementId: number = null;
		let accountDescription: string = null;

		for (let a = 0; a < totalRecords; a++) {
			const currentRecord = (csvRecordsArray[a] as string).split(',');
			const _tmp = {
				statementId: (statementId ? statementId : null),
				accountDescription: (accountDescription ? accountDescription : null),
				accountsId: (this.selectedAccount ? this.selectedAccount : null),
				date1: null,
				date2: null,
				description: null,
				credit: null,
				debit: null,
				balance: null,
				serviceFee: null,
				journal: '',
				comments: ''
			};
			let _tmpAmount;
			if (currentRecord[0].includes('Account')) {
				if (!currentRecord[0].includes('Description')) {
					accountsId = currentRecord[1].trim();
				} else if (currentRecord[0].includes('Description')) {
					accountDescription = currentRecord[1];
				}
			}
			if (currentRecord[0].includes('Statement Number ')) {
				statementId = Number(currentRecord[1]);
			}
			if (currentRecord.length >= 4) {
				const _account = this.accounts.find(pAccount => {
					if (pAccount._id === this.selectedAccount) {
						return pAccount;
					}
				});
				if (_account) {
					switch (Number(_account.csvType)) {
						case 1: // FNB accounts, eBucks
							_tmpAmount = (currentRecord[1] ? parseFloat(currentRecord[1].trim()) : null);
							_tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
							_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
							_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
							_tmp.balance = (currentRecord[2] ? parseFloat(currentRecord[2].trim()) : null);
							_tmp.description = (currentRecord[3] ? currentRecord[3].trim() : null);
							break;
						case 2: // Nedbank cheque, Nedbank savings
							_tmpAmount = (currentRecord[2] ? parseFloat(currentRecord[2].trim()) : null);
							_tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
							_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
							_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
							_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
							_tmp.balance = (currentRecord[3] ? parseFloat(currentRecord[3].trim()) : null);
							_tmp.serviceFee = (currentRecord[4] ? (currentRecord[4].trim() === '#' ? true : null) : null);
							break;
						case 3: // Nedbank credit
							_tmpAmount = (currentRecord[5] ? parseFloat(currentRecord[5].trim()) : null);
							_tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
							_tmp.date2 = (currentRecord[1] ? currentRecord[1].trim() : null);
							_tmp.description = (currentRecord[2] ? currentRecord[2].trim() : null);
							// blank space
							// blank space
							// _tmp.credit = (currentRecord[5] ? parseFloat(currentRecord[5].trim()) : null);
							_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
							_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
							break;
						case 4: // Nedbank loan - tba
							_tmpAmount = (currentRecord[5] ? parseFloat(currentRecord[5].trim()) : null);
							_tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
							_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
							_tmp.credit = (currentRecord[2] ? parseFloat(currentRecord[2].trim()) : null);
							_tmp.balance = (currentRecord[3] ? parseFloat(currentRecord[3].trim()) : null);
							break;
						case 5: // Nedbank investment
							_tmp.date1 = (currentRecord[0] ? currentRecord[0].trim() : null);
							_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
							_tmp.debit = (currentRecord[2] ? parseFloat(currentRecord[2].trim()) : null);
							_tmp.credit = (currentRecord[3] ? parseFloat(currentRecord[3].trim()) : null);
							_tmp.balance = (currentRecord[4] ? parseFloat(currentRecord[4].trim()) : null);
							break;
					}
					if (_tmp.date1 && !_tmp.date1.includes('Date')) {
						const csvRecord: AccountRecordsInterface = new AccountRecordsInterface(_tmp);
						this._httpService.post('accountRecords/add', csvRecord).then((pResponse: any) => {
							if (!pResponse.errors) {
								this.addedRecords++;
								this.accountRecords.push(csvRecord);
							} else {
								this.existingRecords++;
							}
							this.csvTextData = '';
						});
					} else {
						this.removedRecords++;
					}
				}
			} else {
				this.dataRows++;
			}
		}
	}
}
