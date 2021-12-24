import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// service
import { GeneralService, HttpService, NotificationsService } from '@common/services';
// interfaces
import { IFilterBoxConfig, IFilterBoxOptions, IBankAccount } from '@common/interfaces';
// constants
import { bankAccounts, budgets, clients } from '@common/constants';

@Component({
	selector: 'acc-global-view',
	templateUrl: './global-view.component.html',
	styleUrls: ['./global-view.component.scss']
})
export class GlobalViewComponent implements OnInit {
	megaMenu: any;
	module: any;
	bsModalRef: BsModalRef;
	apiUrl: string;
	tableHead: any[];
	tableBody: any[];
	// results: IBankAccount[];
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
		this._generalService.setTitle(`Bank Accounts: View All`);
		this.filterBoxConfig = new IFilterBoxConfig();
	}

	ngOnInit() {
		this.megaMenu = this.route.snapshot.data.menu;
		this.module = this.route.snapshot.data.module;
		switch (this.module) {
			case `bank-accounts`:
				this.tableHead = bankAccounts;
				this.apiUrl = `bank-accounts/view`;
				break;
			case `budget`:
				this.tableHead = budgets;
				this.apiUrl = `budget/view`;
				break;
			case `clients`:
				this.tableHead = clients;
				this.apiUrl = `clients/view`;
				break;
		}
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
		if (typeof pEvent !== `object`) {
			switch (pEvent) {
				case `load`:
				case `changed`:
					this.load();
					break;
			}
		} else {
			switch (pEvent.action) {
				case `enable`:
					this.status(pEvent.record, `false`);
					break;
				case `cancel`:
					this.status(pEvent.record, `true`);
					break;
				case `delete`:
					this.delete(pEvent.record);
					break;
			}
		}
	}

	load() {
		this._httpService.post(this.apiUrl, this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				// this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	status(pId, pAction) {
		this._httpService.update(this.module + `/status`, pId, { action: pAction }).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}

	delete(pId) {
		this._httpService.delete(this.module + `/delete`, pId).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}
}
