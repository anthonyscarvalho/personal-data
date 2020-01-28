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
			data: '_id'
		}, {
			text: 'Account Number',
			data: 'accountNumber'
		}, {
			text: 'Account Description',
			data: 'accountDescription'
		}, {
			text: 'Account Status',
			data: 'status'
		}, {
			text: 'Date Opened',
			data: 'dateOpened'
		}, {
			text: 'Date Closed',
			data: 'dateClosed'
		}
	];
	// tableBody: AccountsViewInterface[];
	tableBody;
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
		this.load();
	}

	load() {
		this.filterBoxOptions = new FilterBoxOptionsInterface();
		this.filterBoxOptions.state = this._generalService.getActiveFilter();
		this.filterBoxOptions.searchPhrase = this._generalService.getSearchPhrase();
		this.filterBoxOptions.column = this._generalService.getSortColumn();
		this.filterBoxOptions.dir = this._generalService.getSortDir();
		this.filterBoxOptions.page = this._generalService.getPage();
		this.filterBoxOptions.pagerRecords = this._generalService.getRecords();

		this._httpService.post('accountRecords/view', this.filterBoxOptions).then((results: any) => {
			if (results.status === '00') {
				this.results = results.data;
				this.totalRecords = results.records;
			}
		});
	}


	filterUpdater(pEvent) {
		if (!Array.isArray(pEvent)) {
			switch (pEvent) {
				case 'load':
				case 'changed':
					this.load();
					break;
				case 'add':
					this._generalService.redirect('account-records/add');
					break;
			}
		}
	}

	enable(pId) {
		if (confirm('Are you sure you want to enable this record?')) {
			this._httpService.post('accounts/enable', {
				id: pId
			}).then((results: any) => {
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

	cancel(pId) {
		if (confirm('Are you sure you want to cancel this record?')) {
			this._httpService.post('accounts/cancel', {
				id: pId
			}).then((results: any) => {
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

	delete(pId) {
		if (confirm('Are you sure you want to delete this record?')) {
			this._httpService.delete('accounts/delete', pId).then((results: any) => {
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

}
