import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';
// modules
import { CategoriesService } from '@categories/services';
import { CategoryModel } from '@categories/interfaces';

@Component({
	selector: 'acc-categories-view',
	templateUrl: './categories-view.component.html',
	styleUrls: ['./categories-view.component.scss']
})
export class CategoriesViewComponent implements OnInit {
	megaMenu: any;
	module: any;
	bsModalRef: BsModalRef;
	apiUrl: string;
	tableHead: any[];
	tableBody: CategoryModel[];
	public filterBoxOptions: IFilterBoxOptions;
	public filterBoxConfig: IFilterBoxConfig;
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
		this._CategoriesService.getRecords(this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				// this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
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
