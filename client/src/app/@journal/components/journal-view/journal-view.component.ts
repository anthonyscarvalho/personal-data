import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';
// modules
import {  JournalModel } from '@journal/interfaces';

@Component({
	selector: 'acc-journal-view',
	templateUrl: './journal-view.component.html',
	styleUrls: ['./journal-view.component.scss']
})
export class JournalViewComponent implements OnInit {
	tableHead = [
		{
			text: `ID`,
			data: `_id`,
			width: `250px`
		}, {
			text: `Account Name`,
			data: `accountName`
		}, {
			text: `Account Number`,
			data: `accountNumber`,
			width: `250px`
		}
	];
	tableBody: JournalModel[];
	results: JournalModel[];
	public filterBoxOptions: IFilterBoxOptions;
	public filterBoxConfig: IFilterBoxConfig;
	totalRecords: string;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		_generalService.setTitle(`Journals: View All`);
		this.filterBoxConfig = new IFilterBoxConfig();
	}

	ngOnInit() {
		localStorage.setItem(`activeMenu`, `journals`);
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
				case `add`:
					this._generalService.redirect(`journals/add`);
					break;
			}
		} else {
			switch (pEvent.action) {
				case `enable`:
					this.enable(pEvent.record);
					break;
				case `cancel`:
					this.cancel(pEvent.record);
					break;
				case `delete`:
					this.delete(pEvent.record);
					break;
			}
		}
	}

	load() {
		this._httpService.post(`journals/view`, this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	enable(pId) {
		this._httpService.update(`journals/enable`, pId, {}).then((results: any) => {
			if (results.status === `00`) {
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
		this._httpService.update(`journals/cancel`, pId, {}).then((results: any) => {
			if (results.status === `00`) {
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
		this._httpService.delete(`journals/delete`, pId).then((results: any) => {
			if (results.status === `00`) {
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
