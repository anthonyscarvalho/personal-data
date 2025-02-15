import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tDropDownOption } from '@sharedTypes/interfaces';
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-account-records-report',
	templateUrl: './account-records-report.component.html',
	styleUrls: ['./account-records-report.component.scss']
})
export class AccountRecordsReportComponent implements OnInit {
	megaMenu: any;
	account = '';
	accounts: tDropDownOption;
	submitted = false;
	dateToday = new Date();
	dateStart: string;
	dateEnd: string;

	accountRecords: [];

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		this.dateEnd = this._generalService.formatDate(this.dateToday);
		this.dateToday.setMonth(this.dateToday.getMonth() - 1);
		this.dateStart = this._generalService.formatDate(this.dateToday);
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit(): void {
		this.accounts = {
			label: `Accounts`,
			options: [{
				label: `Please select`,
				value: ``
			}]
		};
		this.loadAccounts();
	}

	loadAccounts() {
		this._httpService.post(`bank-accounts/viewAll`, {}).then((results: any) => {
			if (results.status === `00`) {
				results.data.map(account => {
					this.accounts.options.push({
						label: account.accountDescription,
						value: account._id
					});
				});
			}
		});
	}

	searchTransactions() {
		const _data = {
			dateStart: this.dateStart,
			dateEnd: this.dateEnd,
			account: this.account
		};

		this._httpService.post(`bank-account-records/filter`, _data).then((results: any) => {
			if (results.status === `00`) {
				this.accountRecords = results.data;
			}
		});
	}

	updateValue(pEvent, pChangeType) {
		switch (pChangeType) {
			case `account`:
				this.account = pEvent;
				break;
			case `dateStart`:
				this.dateStart = pEvent;
				break;
			case `dateEnd`:
				this.dateEnd = pEvent;
				break;
		}
	}
}
