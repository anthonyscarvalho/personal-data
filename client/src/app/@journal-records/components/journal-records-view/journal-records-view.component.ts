import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { cJournalRecord, cFilterBoxConfig, cFilterBoxOption } from '@sharedTypes/classes';
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-journal-records-view',
	templateUrl: './journal-records-view.component.html',
	styleUrls: ['./journal-records-view.component.scss']
})
export class JournalRecordsViewComponent implements OnInit {
	megaMenu: any;
	tableHead = [
		{
			text: 'ID',
			data: '_id',
			width: '250px'
		}, {
			text: 'Journal ID',
			data: 'journalId'
		}, {
			text: 'Date',
			data: 'date'
		}, {
			text: 'Credit',
			data: 'credit'
		}, {
			text: 'Debit',
			data: 'debit'
		}
	];
	tableBody: cJournalRecord[];
	results: cJournalRecord[];
	public filterBoxOptions: cFilterBoxOption;
	public filterBoxConfig: cFilterBoxConfig;
	totalRecords: string;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		this._generalService.setTitle('Journal Records: View All');
		this.filterBoxConfig = new cFilterBoxConfig();
	}

	ngOnInit() {
		localStorage.setItem('activeMenu', 'journal-records');
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
		if (typeof pEvent !== 'object') {
			switch (pEvent) {
				case 'load':
				case 'changed':
					this.load();
					break;
				case 'add':
					this._generalService.redirect('journal-records/add');
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
		this._httpService.post('journalRecords/view', this.filterBoxOptions).then((results: any) => {
			if (results.status === '00') {
				this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	enable(pId) {
		this._httpService.update('journalRecords/enable', pId, {}).then((results: any) => {
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
		this._httpService.update('journalRecords/cancel', pId, {}).then((results: any) => {
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
		this._httpService.delete('journalRecords/delete', pId).then((results: any) => {
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
