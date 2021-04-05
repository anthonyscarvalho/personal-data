import { Component, ViewChild, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// validators
import { NumericValues } from '../../../_helpers/validation';
// external
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// interfaces
import { FilterBoxConfigInterface, FilterBoxOptionsInterface } from '../../../interfaces/filterBoxOptions';
import { BankAccountsEditInterface, BankAccountRecordsInterface } from '../../../interfaces/bankAccounts';
// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
	selector: `app-ba-edit`,
	templateUrl: `./ba-edit.component.html`,
	styleUrls: [`./ba-edit.component.scss`]
})
export class BaEditComponent implements OnInit, OnDestroy {
	bsModalRef: BsModalRef;

	bankAccountsAddForm: FormGroup;
	addRecordEventEmitter = false;

	accountNumber: number;
	csvType: number;

	submitted = false;
	error = false;

	parentId: string;

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
	public filterBoxOptions: FilterBoxOptionsInterface;
	public filterBoxConfig: FilterBoxConfigInterface;

	constructor(
		public fb: FormBuilder,
		private route: ActivatedRoute,
		private datePipe: DatePipe,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		if (this.route.snapshot.paramMap.get(`id`)) {
			this.parentId = this.route.snapshot.paramMap.get(`id`);
		} else {
			this.parentId = null;
		}
		this.bsConfig.containerClass = `theme-dark-blue`;
		this.bsConfig.dateInputFormat = `YYYY-MM-DD`; // Or format like you want
		this.filterBoxConfig = new FilterBoxConfigInterface();
		this.filterBoxConfig.backLink = `/account-records/view`;
		this.filterBoxConfig.updateControls = true;
	}

	ngOnInit() {
		this.bankAccountsAddForm = this.fb.group({
			accountNumber: [``, [Validators.required, NumericValues]],
			accountDescription: [``, [Validators.required]],
			dateOpened: [``],
			dateClosed: [``],
			csvType: [``, [Validators.required]],
			status: [``, [Validators.required]],
			_id: [``],
			canceled: [``],
			canceledDate: [``]
		});
		if (this.parentId) {
			this.load();
		}
	}

	// convenience getter for easy access to form fields
	get f() { return this.bankAccountsAddForm.controls; }

	submit() {
		this.submitted = true;
		this.error = false;
		if (this.bankAccountsAddForm.valid) {
			const _postForm: BankAccountsEditInterface = new BankAccountsEditInterface(this.bankAccountsAddForm.value);

			const _dateOp = new Date(_postForm.dateOpened);
			_postForm.dateOpened = this.datePipe.transform(_dateOp, `yyyy-MM-dd`);
			if (_postForm.dateClosed !== ``) {
				const _dateCl = new Date(_postForm.dateClosed);
				_postForm.dateClosed = this.datePipe.transform(_dateCl, `yyyy-MM-dd`);
			}
			this._httpService.update(`bank-accounts/update`, this.bankAccountsAddForm.value._id, _postForm).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === `valid`) {
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
			this.error = true;
			this.submitted = false;
		}
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
				this.bankAccountsAddForm.setValue(pResults.data);
				this._generalService.setTitle(`Bank Accounts: Edit - ` + pResults.data.accountDescription);
			}
		});
	}

	convertDate(pDate) {
		const _tmpDate = new Date(pDate);
		return _tmpDate.getFullYear() + `-` + (_tmpDate.getMonth() + 1) + `-` + _tmpDate.getDate();
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
