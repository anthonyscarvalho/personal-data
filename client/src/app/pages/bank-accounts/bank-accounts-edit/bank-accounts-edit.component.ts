import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// component
import { BankAccountsRecordsComponent } from '../bank-accounts-records/bank-accounts-records.component';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// validators
import { NumericValues } from '../../../_helpers/validation';
// external
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// interfaces
import { FilterBoxConfigInterface, FilterBoxOptionsInterface } from '../../../interfaces/filterBoxOptions';
import { BankAccountsViewInterface, BankAccountsEditInterface, BankAccountRecordsInterface } from '../../../interfaces/bankAccounts';
// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
	selector: 'app-bank-accounts-edit',
	templateUrl: './bank-accounts-edit.component.html',
	styleUrls: ['./bank-accounts-edit.component.scss']
})
export class BankAccountsEditComponent implements OnInit {
	bsModalRef: BsModalRef;

	bankAccountsAddForm: FormGroup;

	results: BankAccountRecordsInterface;
	submitted = false;

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

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
	private filterBoxOptions: FilterBoxOptionsInterface;
	private filterBoxConfig: FilterBoxConfigInterface;

	constructor(
		public fb: FormBuilder,
		private route: ActivatedRoute,
		private _modalService: BsModalService,
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
		this.filterBoxConfig = new FilterBoxConfigInterface();
		this.filterBoxConfig.backLink = '/account-records/view';
		this.filterBoxConfig.updateControls = true;
	}

	ngOnInit() {
		this.bankAccountsAddForm = this.fb.group({
			accountNumber: ['', [Validators.required, NumericValues]],
			accountDescription: ['', [Validators.required]],
			dateOpened: [''],
			dateClosed: [''],
			csvType: ['', [Validators.required]],
			status: ['', [Validators.required]],
			_id: ['']
		});
		if (this.parentId) {
			this.load();
		}
	}

	// convenience getter for easy access to form fields
	get f() { return this.bankAccountsAddForm.controls; }

	submit() {
		this.submitted = true;
		if (this.bankAccountsAddForm.valid) {
			this._httpService.update('bank-accounts/update', this.bankAccountsAddForm.value._id, this.bankAccountsAddForm.value).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === 'valid') {
					this._notificationsService.success(pResult.message);
				} else {
					if (pResult.errors) {
						pResult.errors.forEach(pError => {
							this._notificationsService.warn(pError);
						});
					}
				}
				setTimeout(() => {
					this.submitted = false;
				}, 500);
			});
		} else {
			console.log('invalid');
			this.submitted = false;
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

	load() {
		this._httpService.post('bank-accounts/view/' + this.parentId, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === 'valid') {
				this.bankAccountsAddForm.setValue(pResults.data);
				this._generalService.setTitle('Bank Accounts: Edit - ' + pResults.data.accountDescription);
			}
		});
	}

	addNewRecords() {
		this.bsModalRef = this._modalService.show(BankAccountsRecordsComponent, Object.assign({}, { class: 'modal__full', ignoreBackdropClick: true }));
		this._modalService.onHide.subscribe((reason: string) => {
			this.load();
		});
	}

	convertDate(pDate) {
		const _tmpDate = new Date(pDate);
		return _tmpDate.getFullYear() + '-' + (_tmpDate.getMonth() + 1) + '-' + _tmpDate.getDate();
	}
}
