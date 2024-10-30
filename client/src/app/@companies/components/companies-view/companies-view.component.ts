import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { cCategory, cFilterBoxConfig, cFilterBoxOption } from '@sharedTypes/classes';
import { GeneralService, HttpService, NotificationsService } from '@common/services';

import { CategoriesService } from '@categories/services';

@Component({
	selector: 'acc-companies-view',
	templateUrl: './companies-view.component.html',
	styleUrls: ['./companies-view.component.scss']
})
export class CompaniesViewComponent implements OnInit {
	megaMenu: any;
	module: any;
	bsModalRef: BsModalRef;
	apiUrl: string;
	tableHead: any[];
	tableBody: cCategory[];
	public filterBoxOptions: cFilterBoxOption;
	public filterBoxConfig: cFilterBoxConfig = new cFilterBoxConfig({ showBankAccounts: false });
	totalRecords: string;

	constructor(
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService,
		private _CategoriesService: CategoriesService,
	) {
		this._generalService.setTitle(`Categories: View All`);
	}

	ngOnInit() {
		this.megaMenu = this.route.snapshot.data.menu;

		this.filterBoxOptions = new cFilterBoxOption();
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

	getActiveColumn(currentColumn: string) {
		const activeColumn = this._generalService.getSortColumn();
		if (currentColumn === activeColumn) {
			return true;
		} else {
			return false;
		}
	}

	load() {
		this._httpService.post(`companies/view`, this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				// this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	status(pId, pAction) {
		this._generalService.changeStatus('companies', pId, pAction);
		setTimeout(() => {
			this.load();
		}, 30);
	}

	delete(pId) {
		this._generalService.deleteRecord('companies', pId);
		setTimeout(() => {
			this.load();
		}, 30);
	}
}
