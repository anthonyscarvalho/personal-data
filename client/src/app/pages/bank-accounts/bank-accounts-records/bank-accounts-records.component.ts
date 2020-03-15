import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// interfaces
import { BankAccountRecordsInterface } from '../../../interfaces/bankAccounts';
// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';
@Component({
	selector: 'app-bank-accounts-records',
	templateUrl: './bank-accounts-records.component.html',
	styleUrls: ['./bank-accounts-records.component.scss']
})
export class BankAccountsRecordsComponent implements OnInit {
	@ViewChild('form', { static: false }) form: NgForm;
	@ViewChild('filePicker', { static: false }) _file: ElementRef;

	parentId: string;
	accountRecords = [];
	selectedAccount = '';
	transactions;

	dataRows = 0;
	totalCount = 0;
	addedRecords = 0;
	existingRecords = 0;
	removedRecords = 0;
	csvTextData: string;
	accounts;

	constructor(
		public bsModalRef: BsModalRef,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) { }

	ngOnInit() {
	}

	submitForm() {
		this.form.ngSubmit.emit();
	}

	processRecords(pEvent) {
		if (this._file) {
			this.accountRecords = [];
			const files: { [key: string]: File } = this._file.nativeElement.files;
			const _totalFiles = Number(files.length);
			this.transactions = [];
			this.totalCount = 0;
			this.addedRecords = 0;
			this.existingRecords = 0;
			this.removedRecords = 0;
			for (let a = 0; a < _totalFiles; a++) {
				const reader = new FileReader();
				reader.readAsText(files[a]);

				reader.onload = () => {
					const csvData = reader.result;
					const _tmpFile = (csvData as string).split(/\r\n|\n/);
					if (_tmpFile) {
						// const totalRecords = _tmpFile.length;
						// this.totalCount = this.totalCount + Number(totalRecords);
						let statementId: number = null;
						_tmpFile.map(pRecord => {
							const accountDescription: string = null;
							const currentRecord = (pRecord as string).split(',');
							let accountNumber;
							let _tmpAmount;

							if (currentRecord[0].includes('Account')) {
								if (!currentRecord[0].includes('Description')) {
									accountNumber = currentRecord[1].trim();
								}
							}

							if (currentRecord[0].includes('Statement Number')) {
								statementId = Number(currentRecord[1]);
							}
							const _tmp = {
								statementId: (statementId ? statementId : null),
								accountsId: (this.selectedAccount ? this.selectedAccount : null),
								date1: null,
								date2: null,
								description: null,
								credit: null,
								debit: null,
								balance: null,
								serviceFee: null,
								journal: '',
								comments: '',
								processed: 'false',
							};
							if (currentRecord.length >= 4) {
								const _account = this.accounts.find(pAccount => {
									if (pAccount._id === this.selectedAccount) {
										return pAccount;
									}
								});
								if (_account) {
									switch (Number(_account.csvType)) {
										case 1: // FNB accounts, eBucks
											_tmpAmount = (currentRecord[1] ? Number(currentRecord[1].trim()) : null);
											_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
											_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
											_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
											_tmp.balance = (currentRecord[2] ? Number(currentRecord[2].trim()) : null);
											_tmp.description = (currentRecord[3] ? currentRecord[3].trim() : null);
											break;
										case 2: // Nedbank cheque, Nedbank savings
											_tmpAmount = (currentRecord[2] ? Number(currentRecord[2].trim()) : null);
											_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
											_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
											_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
											_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
											_tmp.balance = (currentRecord[3] ? Number(currentRecord[3].trim()) : null);
											_tmp.serviceFee = (currentRecord[4] ? (currentRecord[4].trim() === '#' ? true : null) : null);
											break;
										case 3: // Nedbank credit
											_tmpAmount = (currentRecord[5] ? Number(currentRecord[5].trim()) : null);
											_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
											_tmp.date2 = (currentRecord[1] ? this.convertDate(currentRecord[1].trim()) : null);
											_tmp.description = (currentRecord[2] ? currentRecord[2].trim() : null);
											// blank space
											// blank space
											// _tmp.credit = (currentRecord[5] ? Number(currentRecord[5].trim()) : null);
											_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
											_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
											break;
										case 4: // Nedbank loan - tba
											_tmpAmount = (currentRecord[5] ? Number(currentRecord[5].trim()) : null);
											_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
											_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
											_tmp.credit = (currentRecord[2] ? Number(currentRecord[2].trim()) : null);
											_tmp.balance = (currentRecord[3] ? Number(currentRecord[3].trim()) : null);
											break;
										case 5: // Nedbank investment
											_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
											_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
											_tmp.debit = (currentRecord[2] ? Number(currentRecord[2].trim()) : null);
											_tmp.credit = (currentRecord[3] ? Number(currentRecord[3].trim()) : null);
											_tmp.balance = (currentRecord[4] ? Number(currentRecord[4].trim()) : null);
											break;
									}

									if ((_tmp.date1 && !_tmp.date1.includes('Date')) && (_tmp.description && !_tmp.description.includes('Description'))) {
										this.totalCount++;
										this.accountRecords.push(_tmp);
									}
								}
							}
						});


					}
				};

				reader.onerror = () => {
					console.log('error has occurred while reading file!');
				};
			}
		}
	}

	uploadRecords() {
		this.existingRecords = 0;
		this.addedRecords = 0;
		this.accountRecords.map(pRecord => {
			const csvRecord: BankAccountRecordsInterface = new BankAccountRecordsInterface(pRecord);
			this._httpService.post('accountRecords/add', csvRecord).then((pResponse: any) => {
				if (!pResponse.errors) {
					this.addedRecords++;
					pRecord.processed = 'true';
				} else {
					pRecord.processed = 'exists';
					this.existingRecords++;
				}
				// if (pResponse.status === '00' || pResponse.status === '02') {
				// 	const index: number = this.accountRecords.indexOf(pRecord);
				// 	if (index !== -1) {
				// 		this.accountRecords.splice(index, 1);
				// 	}
				// }
			});
		});

	}

	convertDate(pDate) {
		const _tmpDate = new Date(pDate);
		return _tmpDate.getFullYear() + '-' + (_tmpDate.getMonth() + 1) + '-' + _tmpDate.getDate();
	}
}
