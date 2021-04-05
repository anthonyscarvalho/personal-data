import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// validators
import { NumericValues } from '../../../_helpers/validation';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// interfaces
import { BankAccountsAddInterface } from '../../../interfaces/bankAccounts';
// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
	selector: 'app-ba-add',
	templateUrl: './ba-add.component.html',
	styleUrls: ['./ba-add.component.scss']
})
export class BaAddComponent implements OnInit {
	@ViewChild('filePicker') _file: ElementRef;

	results: BankAccountsAddInterface;
	bankAccountsAddForm: FormGroup;
	submitted = false;

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

	constructor(
		public fb: FormBuilder,
		public bsModalRef: BsModalRef,
		private route: ActivatedRoute,
		private datePipe: DatePipe,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		this.bsConfig.containerClass = 'theme-dark-blue';
		this.bsConfig.dateInputFormat = 'YYYY-MM-DD'; // Or format like you want
	}

	ngOnInit() {
		if (!this.results) {
			this.results = new BankAccountsAddInterface();
		}
		this.bankAccountsAddForm = this.fb.group({
			accountNumber: ['', [Validators.required, NumericValues]],
			accountDescription: ['', [Validators.required]],
			dateOpened: [''],
			dateClosed: [''],
			csvType: ['', [Validators.required]],
			status: ['', [Validators.required]],
			canceled: [''],
			canceledDate: ['']
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.bankAccountsAddForm.controls; }

	submit() {
		this.submitted = true;
		if (this.bankAccountsAddForm.valid) {
			const _postForm: BankAccountsAddInterface = this.bankAccountsAddForm.value;

			const _dateOp = new Date(_postForm.dateOpened);
			_postForm.dateOpened = this.datePipe.transform(_dateOp, 'yyyy-MM-dd');
			if (_postForm.dateClosed !== '') {
				const _dateCl = new Date(_postForm.dateClosed);
				_postForm.dateClosed = this.datePipe.transform(_dateCl, 'yyyy-MM-dd');
			}

			this._httpService.post('bank-accounts/add', _postForm).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === 'valid') {
					this._notificationsService.success(pResult.message);
					this.close();
				} else {
					if (pResult.errors) {
						pResult.errors.forEach(pError => {
							this._notificationsService.warn(pError);
						});
					}
				}
			});
		} else {
			console.log('invalid');
		}
	}

	checkClass(fieldName) {
		if (this.submitted) {
			if (fieldName.errors) {
				return `is-invalid`;
			} else {
				return `is-valid`;
			}
		}
	}

	close() {
		this.bsModalRef.hide();
	}
}
