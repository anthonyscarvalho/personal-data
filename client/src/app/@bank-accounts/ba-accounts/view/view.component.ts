import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// service
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';
// interfaces
import { FilterBoxConfigInterface, FilterBoxOptionsInterface } from '../../../interfaces/filterBoxOptions';
import { BankAccountsViewInterface } from '../../../interfaces/bankAccounts';

@Component({
	selector: 'app-ba-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss']
})
export class BaViewComponent implements OnInit {
	megaMenu: any;
	bsModalRef: BsModalRef;
	tableHead = [
		{
			text: 'ID',
			data: '_id',
			width: '250px'
		}, {
			text: 'Account Number',
			data: 'accountNumber'
		}, {
			text: 'Description',
			data: 'accountDescription'
		}, {
			text: 'Date Opened',
			data: 'dateOpened'
		}, {
			text: 'Date Closed',
			data: 'dateClosed'
		}, {
			text: 'Status',
			data: 'status'
		}
	];
	tableBody: BankAccountsViewInterface[];
	results: BankAccountsViewInterface[];
	public filterBoxOptions: FilterBoxOptionsInterface;
	public filterBoxConfig: FilterBoxConfigInterface;
	totalRecords: string;

	constructor(
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		this._generalService.setTitle('Bank Accounts: View All');
		this.filterBoxConfig = new FilterBoxConfigInterface();
	}

	ngOnInit() {
		this.megaMenu = this.route.snapshot.data["menu"];
		this.filterBoxOptions = new FilterBoxOptionsInterface();
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
					this._generalService.redirect('bank-accounts/add');
					break;
			}
		} else {
			switch (pEvent.action) {
				case 'enable':
					this.status(pEvent.record, 'false');
					break;
				case 'cancel':
					this.status(pEvent.record, 'true');
					break;
				case 'delete':
					this.delete(pEvent.record);
					break;
			}
		}
	}

	load() {
		this._httpService.post('bank-accounts/view', this.filterBoxOptions).then((results: any) => {
			if (results.status === '00') {
				this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	status(pId, pAction) {
		this._httpService.update('bank-accounts/status', pId, { action: pAction }).then((results: any) => {
			if (results.status === '00') {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}

	delete(pId) {
		this._httpService.delete('bank-accounts/delete', pId).then((results: any) => {
			if (results.status === '00') {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}

}
