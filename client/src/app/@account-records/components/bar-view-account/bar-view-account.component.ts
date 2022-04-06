import { Component, Input, Output, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// component
// import { BankAccountsAddComponent } from '../bank-accounts-add/bank-accounts-add.component';
import { BarAddModalViewComponent } from '../bar-add-modal/bar-add-modal.component';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';
// modules
import { BankAccountModel } from '@bankAccounts/interfaces';

@Component({
	selector: 'acc-bar-view-account',
	templateUrl: './bar-view-account.component.html',
	styleUrls: ['./bar-view-account.component.scss']
})
export class BarViewAccountComponent implements OnInit, OnDestroy {
	@Input(`accountId`) _accountId: string;
	@Input(`accountNumber`) _accountNumber: string;
	@Input(`csvType`) _csvType: number;
	@Output(`updater`) _updater = new EventEmitter();

	bsModalRef: BsModalRef;
	tableHead = [
		{
			text: `ID`,
			data: `_id`,
			width: `250px`
		}, {
			text: `Date`,
			data: `date1`,
			width: `150px`
		}, {
			text: `Description`,
			data: `description`
		}, {
			text: `Credit`,
			data: `credit`,
			width: `110px`
		}, {
			text: `Debit`,
			data: `debit`,
			width: `110px`
		}, {
			text: `Balance`,
			data: `balance`,
			width: `110px`
		}
	];
	tableBody: BankAccountModel[];
	results: BankAccountModel[];
	public filterBoxOptions: IFilterBoxOptions;
	public filterBoxConfig: IFilterBoxConfig;
	totalRecords: string;

	constructor(
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		// this._generalService.setTitle(`Bank Accounts: View All`);
		// this.filterBoxConfig = new IFilterBoxConfig();
	}

	ngOnInit() {
		this._generalService.setActiveColumn(`date1`);
		this.filterBoxOptions = new IFilterBoxOptions();
		this.filterBoxOptions.page = this._generalService.getPage();
		this.filterBoxOptions.pagerRecords = this._generalService.getRecords();
		this.filterBoxOptions.column = this._generalService.getSortColumn();
		this.filterBoxOptions.dir = this._generalService.getSortDir();
		this._generalService.getModalShowName().subscribe((pEvent) => {
			if (pEvent.toString() === `addRecordTransaction`) {
				this.modalAdd();
			}
		});
		this.load();
	}

	load() {
		this._httpService.post(`bank-account-records/view/` + this._accountId, this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				this.results = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
				this.tableBody = results.data;
			}
		});
	}

	filterUpdater(pEvent: any) {
		if (typeof pEvent !== `object`) {
			switch (pEvent) {
				case `load`:
				case `changed`:
					this.load();
					break;
				case `add`:
					this.modalAdd();
					// this._generalService.redirect(`bank-accounts/add`);
					break;
			}
		} else {
			switch (pEvent.action) {
				case `delete`:
					this.delete(pEvent.record);
					break;
			}
		}
	}

	modalAdd() {
		const config = {
			class: `modal__full`,
			ignoreBackdropClick: true,
			initialState: {
				accountNumber: this._accountId,
				csvType: this._csvType
			}
		};

		this.bsModalRef = this._modalService.show(BarAddModalViewComponent, config);

		this._modalService.onHide.subscribe((reason: string) => {
			this.load();
		});
	}

	delete(pId) {
		this._httpService.delete(`bank-account-records/delete`, pId).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._updater.emit(`load`);
				this._notificationsService.success(results.message);
			} else {
				if (results.errors) {
					results.errors.forEach(pError => {
						this._notificationsService.warn(pError);
					});
				}
			}
		});
	}

	ngOnDestroy() {
		this._modalService = null;
		this.bsModalRef = null;
		this._generalService.setModalShowName(false);
	}
}
