import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';
// modules
import { BudgetModel } from '@budget/interfaces';

@Component({
	selector: 'acc-account-records-view',
	templateUrl: './account-records-view.component.html',
	styleUrls: ['./account-records-view.component.scss']
})
export class AccountRecordsViewComponent implements OnInit {
	megaMenu: any;
	module: any;
	bsModalRef: BsModalRef;
	apiUrl: string;
	tableHead: any[];
	tableBody: BudgetModel[];

	public filterBoxOptions: IFilterBoxOptions = new IFilterBoxOptions({
		bankAccount: this._generalService.getBankAccount(),
		searchPhrase: this._generalService.getSearchPhrase(),
		column: this._generalService.getSortColumn(),
		dir: this._generalService.getSortDir(),
		page: this._generalService.getPage(),
		pagerRecords: this._generalService.getRecords(),
	});
	public filterBoxConfig: IFilterBoxConfig = new IFilterBoxConfig({
		showStatusFilter: false
	});

	constructor(
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		this._generalService.setTitle(`Bank Account Records: View All`);
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit() {
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

	getActiveColumn(currentColumn: string) {
		const activeColumn = this._generalService.getSortColumn();
		if (currentColumn === activeColumn) {
			return true;
		} else {
			return false;
		}
	}

	load() {
		this._httpService.post('bank-account-records/view', this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				// this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	fixSort() {
		this._httpService.post('bank-account-records/fix-order', this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				this._notificationService.success(results.message);
				this.load();
			}
		});
	}

	status(pId, pAction) {
		this._httpService.update(`bank-account-records/status`, pId, { action: pAction }).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}

	delete(pId) {
		this._httpService.delete(`bank-account-records/delete`, pId).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}
}
