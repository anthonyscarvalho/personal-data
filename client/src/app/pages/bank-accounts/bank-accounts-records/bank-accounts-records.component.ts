import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { stringify } from 'querystring';
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
	@ViewChild('form') form: NgForm;
	@ViewChild('filePicker') _file: ElementRef;

	accountNumber: string;
	csvType: number;
	parentId: string;
	accountRecords = [];

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

	processRecords() {
		if (this._file) {
			this.accountRecords = [];
			const files: { [key: string]: File } = this._file.nativeElement.files;
			const _totalFiles = Number(files.length);
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
						const statementId: number = null;
						_tmpFile.map(pRecord => {
							const currentRecord = (pRecord as string).split(',');
							let _tmpAmount;

							if (currentRecord[0].includes('Account')) {
								return null;
							}
							if (currentRecord[0].includes('Statement Number')) {
								return null;
							}
							if (currentRecord[0].includes('Description')) {
								return null;
							}
							const _tmp = {
								statementId: (statementId ? statementId : null),
								accountsId: this.accountNumber,
								date1: null,
								date2: null,
								description: null,
								credit: 0.00,
								debit: 0.00,
								balance: null,
								serviceFee: null,
								journal: '',
								comments: '',
								processed: 'false'
							};
							if (currentRecord.length >= 4) {
								switch (Number(this.csvType)) {
									case 1: // FNB accounts, eBucks
										_tmpAmount = (currentRecord[1] ? Number(currentRecord[1].trim()) : 0.00);
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : 0.00);
										_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);
										_tmp.balance = (currentRecord[2] ? Number(currentRecord[2].trim()) : 0.00);
										_tmp.description = (currentRecord[3] ? currentRecord[3].trim() : null);
										break;
									case 2: // Nedbank cheque, Nedbank savings
										_tmpAmount = (currentRecord[2] ? Number(currentRecord[2].trim()) : 0.00);
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
										_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : 0.00);
										_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);
										_tmp.balance = (currentRecord[3] ? Number(currentRecord[3].trim()) : 0.00);
										_tmp.serviceFee = (currentRecord[4] ? (currentRecord[4].trim() === '#' ? true : null) : null);
										break;
									case 3: // Nedbank credit
										_tmpAmount = (currentRecord[5] ? Number(currentRecord[5].trim()) : 0.00);
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.date2 = (currentRecord[1] ? this.convertDate(currentRecord[1].trim()) : null);
										_tmp.description = (currentRecord[2] ? currentRecord[2].trim() : null);
										// blank space
										// blank space
										// _tmp.credit = (currentRecord[5] ? Number(currentRecord[5].trim()) : null);
										_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : 0.00);
										_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);
										break;
									case 4: // Nedbank loan - tba
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
										_tmp.credit = (currentRecord[2] ? Number(currentRecord[2].trim()) : 0.00);
										_tmp.balance = (currentRecord[3] ? Number(currentRecord[3].trim()) : 0.00);
										break;
									case 5: // Nedbank investment
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.description = (currentRecord[1] ? currentRecord[1].trim() : null);
										_tmp.debit = (currentRecord[2] ? Number(currentRecord[2].trim()) : 0.00);
										_tmp.credit = (currentRecord[3] ? Number(currentRecord[3].trim()) : 0.00);
										_tmp.balance = (currentRecord[4] ? Number(currentRecord[4].trim()) : 0.00);
										break;
								}

								if ((_tmp.date1 && !_tmp.date1.includes('Date')) && (_tmp.description && !_tmp.description.includes('Description')) && (_tmp.balance)) {
									this.totalCount++;
									this.accountRecords.push(_tmp);
								}
							}
						});

						this.totalRecords = this.accountRecords.length;
					}
				};

				reader.onerror = () => {
					console.log('error has occurred while reading file!');
				};
			}
		}
	}

	submit() { }

	uploadRecords() {
		this.existingRecords = 0;
		this.addedRecords = 0;
		// this.accountRecords.map(pRecord => {
		// 	const csvRecord: BankAccountRecordsInterface = new BankAccountRecordsInterface(pRecord);
		// 	this._httpService.post('bank-account-records/add', csvRecord).then((pResponse: any) => {
		// 		if (pResponse.status) {
		// 			switch (pResponse.status) {
		// 				case '00':
		// 					this.addedRecords++;
		// 					pRecord.processed = 'true';
		// 					break;
		// 				case '01':
		// 					this.errorRecords++;
		// 					pRecord.processed = 'error';
		// 					break;
		// 				case '02':
		// 					this.existingRecords++;
		// 					pRecord.processed = 'exists';
		// 					break;
		// 				case '03':
		// 					this.duplicateRecords++;
		// 					pRecord.processed = 'duplicated';
		// 					break;
		// 			}
		// 		}
		// 	});
		// });

		this._httpService.post('bank-account-records/add', this.accountRecords).then((pResponse: any) => {
			if (pResponse.status) {
				this.accountRecords = pResponse.data;
			} else {
				this.accountRecords = null;
			}
			this.addedRecords = pResponse.addedRecords;
			this.errorRecords = pResponse.errorRecords;
			this.existingRecords = pResponse.existingRecords;
			this.duplicateRecords = pResponse.duplicateRecords;
		});
	}

	convertDate(pDate) {
		const _tmpDate = new Date(pDate);
		const _month = _tmpDate.getMonth() + 1;
		const _day = _tmpDate.getDate();
		return _tmpDate.getFullYear() + '-' + ((_month < 10) ? '0' + _month : _month) + '-' + ((_day < 10) ? '0' + _day : _day);
	}

	get sortData() {
		return this.accountRecords.sort((a, b) => {
			return (new Date(b.date1) as any) - (new Date(a.date1) as any);
		});
	}

	updatePage(pEvent) { }

	close() {
		this.bsModalRef.hide();
	}
}
