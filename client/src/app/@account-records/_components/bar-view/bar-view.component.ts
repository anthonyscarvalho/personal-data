import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// component
// import { BankAccountsAddComponent } from '../bank-accounts-add/bank-accounts-add.component';
import { BarAddModalViewComponent } from '../bar-add-modal/bar-add-modal.component';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// service
import { GeneralService, HttpService, NotificationsService } from '@common/services';
// interfaces
import { IFilterBoxConfig, IFilterBoxOptions, IBankAccount } from '@common/interfaces';

@Component({
	selector: 'acc-bar-view',
	templateUrl: './bar-view.component.html',
	styleUrls: ['./bar-view.component.scss']
})
export class BarViewComponent implements OnInit {
	megaMenu: any;
	bsModalRef: BsModalRef;
	tableHead = [
		{
			text: 'ID',
			data: '_id',
			width: '250px'
		}, {
			text: 'Date',
			data: 'date1',
			width: '150px'
		}, {
			text: 'Date 2',
			data: 'date2',
			width: '150px'
		}, {
			text: 'Description',
			data: 'description'
		}, {
			text: 'Credit',
			data: 'credit'
		}, {
			text: 'Debit',
			data: 'debit'
		}, {
			text: 'Balance',
			data: 'balance'
		}
	];
	tableBody: IBankAccount[];
	results: IBankAccount[];
	public filterBoxOptions: IFilterBoxOptions;
	public filterBoxConfig: IFilterBoxConfig;
	totalRecords: string;

	constructor(
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		this._generalService.setTitle('Bank Accounts: View All');
		this.filterBoxConfig = new IFilterBoxConfig();
	}

	ngOnInit() {
		this.megaMenu = this.route.snapshot.data.menu;
		this.filterBoxOptions = new IFilterBoxOptions();
		this.filterBoxOptions.state = this._generalService.getActiveFilter();
		this.filterBoxOptions.searchPhrase = this._generalService.getSearchPhrase();
		this.filterBoxOptions.column = this._generalService.getSortColumn();
		this.filterBoxOptions.dir = this._generalService.getSortDir();
		this.filterBoxOptions.page = this._generalService.getPage();
		this.filterBoxOptions.pagerRecords = this._generalService.getRecords();
		this.load();
	}

	filterUpdater(pEvent: any) {
		if (typeof pEvent !== 'object') {
			switch (pEvent) {
				case 'load':
				case 'changed':
					this.load();
					break;
				case 'add':
					this.modalAdd();
					// this._generalService.redirect('bank-accounts/add');
					break;
			}
		} else {
			switch (pEvent.action) {
				case 'enable':
					this.enable(pEvent.record);
					break;
				case 'cancel':
					this.cancel(pEvent.record);
					break;
				case 'delete':
					this.delete(pEvent.record);
					break;
			}
		}
	}

	load() {
		this._httpService.post('bank-account-records/view/all', this.filterBoxOptions).then((results: any) => {
			if (results.status === '00') {
				this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	modalAdd() {
		this.bsModalRef = this._modalService.show(BarAddModalViewComponent, Object.assign({}, { class: 'modal__full', ignoreBackdropClick: true }));
		this._modalService.onHide.subscribe((reason: string) => {
			this.load();
		});
	}

	enable(pId) {
		this._httpService.update('bank-accounts/enable', pId, {}).then((results: any) => {
			if (results.status === '00') {
				this.load();
				this._notificationService.success(results.message);
			} else {
				if (results.errors) {
					results.errors.forEach(pError => {
						this._notificationService.warn(pError);
					});
				}
			}
		});
	}

	cancel(pId) {
		this._httpService.update('bank-accounts/cancel', pId, {}).then((results: any) => {
			if (results.status === '00') {
				this.load();
				this._notificationService.success(results.message);
			} else {
				if (results.errors) {
					results.errors.forEach(pError => {
						this._notificationService.warn(pError);
					});
				}
			}
		});
	}

	delete(pId) {
		this._httpService.delete('bank-accounts/delete', pId).then((results: any) => {
			if (results.status === '00') {
				this.load();
				this._notificationService.success(results.message);
			} else {
				if (results.errors) {
					results.errors.forEach(pError => {
						this._notificationService.warn(pError);
					});
				}
			}
		});
	}
}
