import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// service
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';
// interfaces
import { FilterBoxConfigInterface, FilterBoxOptionsInterface } from '../../../interfaces/filterBoxOptions';
import { AccountRecordsInterface } from '../../../interfaces/accountRecords';

@Component({
	selector: 'app-account-records-view',
	templateUrl: './account-records-view.component.html',
	styleUrls: ['./account-records-view.component.scss']
})
export class AccountRecordsViewComponent implements OnInit {
	tableHead = [
		{
			text: 'ID',
			data: '_id',
			width: '250px'
		}, {
			text: 'Account Number',
			data: 'accountNumber'
		}, {
			text: 'Date 1',
			data: 'date1'
		}, {
			text: 'Date 2',
			data: 'date2'
		}, {
			text: 'Credit',
			data: 'credit'
		}, {
			text: 'Debit',
			data: 'debit'
		}, {
			text: 'Journal',
			data: 'journal'
		}
	];
	tableBody: AccountRecordsInterface[];
	results: AccountRecordsInterface[];
	private filterBoxOptions: FilterBoxOptionsInterface;
	private filterBoxConfig: FilterBoxConfigInterface;
	totalRecords: string;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		this._generalService.setTitle('Account Records: View All');
		this.filterBoxConfig = new FilterBoxConfigInterface();
	}

	ngOnInit() {
		localStorage.setItem('activeMenu', 'account-records');
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
					this._generalService.redirect('account-records/add');
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
		this._httpService.post('accountRecords/view', this.filterBoxOptions).then((results: any) => {
			if (results.status === '00') {
				this.results = results.data;
				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	enable(pId) {
		this._httpService.update('accountRecords/enable', pId, {}).then((results: any) => {
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
		this._httpService.update('accountRecords/cancel', pId, {}).then((results: any) => {
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
		this._httpService.delete('accountRecords/delete', pId).then((results: any) => {
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
