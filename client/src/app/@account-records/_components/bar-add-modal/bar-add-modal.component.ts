import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { stringify } from 'querystring';
// interfaces
import { IAccountRecord } from '@shared/interfaces';
// services
import { GeneralService, HttpService, NotificationsService } from '@shared/services';
@Component({
	selector: 'acc-bar-add-modal',
	templateUrl: './bar-add-modal.component.html',
	styleUrls: ['./bar-add-modal.component.scss']
})
export class BarAddModalViewComponent implements OnInit {
	@ViewChild('form') form: NgForm;
	@ViewChild('filePicker') _file: ElementRef;

	public accountNumber: string;
	public csvType: number;
	public parentId: string;
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

	ngOnInit() { }

	submitForm() {
		this.form.ngSubmit.emit();
	}

	processRecords() {
		if (this._file) {
			this.accountRecords = [];
			const files: { [key: string]: File } = this._file.nativeElement.files;
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
						let _index = _tmpFile.length;
						// console.log(_index);
						const statementId: string = null;

						_tmpFile.map(pRecord => {
							const currentRecord = (pRecord as string).split(',');
							let _tmpAmount;

							if (currentRecord[0].includes('Account')) {
								_index--;
								return null;
							}
							else if (currentRecord[0].includes('Statement Number')) {
								_index--;
								return null;
							}
							else if (currentRecord[0].includes('Description')) {
								_index--;
								return null;
							}
							else if (currentRecord[0] === '') {
								_index--;
								return null;
							}
							else if (currentRecord.length >= 4) {
								const _tmp: IAccountRecord = {
									statementId: (statementId ? statementId : null),
									accountsId: this.accountNumber,
									order: _index,
									date1: null,
									date2: null,
									description: null,
									credit: null,
									debit: null,
									balance: null,
									serviceFee: false,
									journal: false,
									comments: '',
									processed: false
								};
								switch (Number(this.csvType)) {
									case 1: // FNB accounts, eBucks
										_tmpAmount = (currentRecord[1] ? this.convertNumber(currentRecord[1]) : null);
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : null);
										_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : null);
										_tmp.balance = (currentRecord[2] ? this.convertNumber(currentRecord[2]) : 0.00);
										_tmp.description = (currentRecord[3] ? this.replaceText(currentRecord[3]) : null);
										break;
									case 2: // Nedbank cheque, Nedbank savings
										_tmpAmount = (currentRecord[2] ? this.convertNumber(currentRecord[2]) : 0.00);
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.description = (currentRecord[1] ? this.replaceText(currentRecord[1]) : null);
										_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : 0.00);
										_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);
										_tmp.balance = (currentRecord[3] ? this.convertNumber(currentRecord[3]) : 0.00);
										_tmp.serviceFee = (currentRecord[4] ? (currentRecord[4].trim() === '#' ? true : false) : false);
										break;
									case 3: // Nedbank credit
										_tmpAmount = (currentRecord[5] ? this.convertNumber(currentRecord[5]) : 0.00);
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.date2 = (currentRecord[1] ? this.convertDate(currentRecord[1].trim()) : null);
										_tmp.description = (currentRecord[2] ? this.replaceText(currentRecord[2]) : null);
										// blank space
										// blank space
										_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : 0.00);
										_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);

										break;
									case 4: // Nedbank loan - tba
										_tmpAmount = (currentRecord[5] ? this.convertNumber(currentRecord[2]) : 0.00);
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.description = (currentRecord[1] ? this.replaceText(currentRecord[1]) : null);
										_tmp.credit = (_tmpAmount && _tmpAmount >= 0 ? _tmpAmount : 0.00);
										_tmp.debit = (_tmpAmount && _tmpAmount < 0 ? _tmpAmount : 0.00);
										_tmp.balance = (currentRecord[3] ? this.convertNumber(currentRecord[3]) : 0.00);
										break;
									case 5: // Nedbank investment
										_tmp.date1 = (currentRecord[0] ? this.convertDate(currentRecord[0].trim()) : null);
										_tmp.description = (currentRecord[1] ? this.replaceText(currentRecord[1]) : null);
										_tmp.debit = (currentRecord[2] ? this.convertNumber(currentRecord[2]) : 0.00);
										_tmp.credit = (currentRecord[3] ? this.convertNumber(currentRecord[3]) : 0.00);
										_tmp.balance = (currentRecord[4] ? this.convertNumber(currentRecord[4]) : 0.00);
										break;
								}
								if ((_tmp.date1 && !_tmp.date1.includes('Date')) && (_tmp.description && !_tmp.description.includes('Description')) && (_tmp.balance.toString() !== '')) {
									this.totalCount++;
									this.accountRecords.push(_tmp);
								} else {
									// console.log(currentRecord);
								}
								_index--;
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
		this.resetCounters();

		const updatedRecords = (pRecord) => {
			return new Promise((resolve, reject) => {
				this._httpService.post('bank-account-records/add', pRecord).then((pResponse: any) => {
					// this.accountRecords = null;

					switch (pResponse.status) {
						case '00':
							this._notificationsService.success(pResponse.message);
							this.addedRecords++;
							break;
						case '01':
							this.errorRecords++;
							this._notificationsService.warn(pResponse.message);
							break;
						case '02':
							this.errorRecords++;
							this._notificationsService.warn(pResponse.message);
							break;
						case '03':
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
			console.log(pResults);
		});


	}

	convertDate(pDate) {
		const _tmpDate = new Date(pDate);
		const _month = _tmpDate.getMonth() + 1;
		const _day = _tmpDate.getDate();
		return _tmpDate.getFullYear() + '-' + ((_month < 10) ? '0' + _month : _month) + '-' + ((_day < 10) ? '0' + _day : _day);
	}

	convertNumber(pNumber) {
		return parseFloat(Number(pNumber.trim()).toFixed(2));
	}

	replaceText(pInput) {
		const doubleSpace = /  +/g;
		const lineBreak = /[\r\n]+/g;

		// use of String replace() Method
		pInput = pInput.replace(doubleSpace, ' ');
		pInput = pInput.replace(lineBreak, '');
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

	close() {
		this.bsModalRef.hide();
	}
}
