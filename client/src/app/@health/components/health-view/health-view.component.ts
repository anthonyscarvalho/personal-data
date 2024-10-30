import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { cFilterBoxConfig, cFilterBoxOption } from '@sharedTypes/classes';
import { GeneralService, HttpService, NotificationsService } from '@common/services';
// modules

@Component({
	selector: 'acc-health-view',
	templateUrl: './health-view.component.html',
	styleUrls: ['./health-view.component.scss']
})
export class HealthViewComponent implements OnInit {
	megaMenu: any;
	module: any;
	totalRecords: string;

	public filterBoxOptions: cFilterBoxOption;
	public filterBoxConfig: cFilterBoxConfig = new cFilterBoxConfig({ showBankAccounts: false });

	constructor(
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService,
	) {
		this._generalService.setTitle(`Clients: View All`);
	}

	ngOnInit(): void {
		this.megaMenu = this.route.snapshot.data.menu;

		this.filterBoxOptions = new cFilterBoxOption();
		this.filterBoxOptions.state = this._generalService.getActiveFilter();
		this.filterBoxOptions.searchPhrase = this._generalService.getSearchPhrase();
		this.filterBoxOptions.column = this._generalService.getSortColumn();
		this.filterBoxOptions.dir = this._generalService.getSortDir();
		this.filterBoxOptions.page = this._generalService.getPage();
		this.filterBoxOptions.pagerRecords = this._generalService.getRecords();
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
		// this._ClientsService.getClients(this.filterBoxOptions).then((results: any) => {
		// 	if (results.status === `00`) {
		// 		// this.results = results.data;
		// 		this.tableBody = results.data;
		// 		this.filterBoxOptions.totalRecords = results.totalRecords;
		// 	}
		// });
	}

	status(pId, pAction) {
		this._generalService.changeStatus('clients', pId, pAction);
		setTimeout(() => {
			this.load();
		}, 30);
	}

	delete(pId) {
		this._generalService.deleteRecord('clients', pId);
		setTimeout(() => {
			this.load();
		}, 30);
	}
}
