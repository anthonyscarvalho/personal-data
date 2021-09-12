import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// services
import { GeneralService, HttpService, NotificationsService } from '@shared/services';

@Component({
	selector: 'acc-bank-accounts-dash',
	templateUrl: './bank-accounts-dash.component.html',
	styleUrls: ['./bank-accounts-dash.component.scss']
})
export class BankAccountsDashComponent implements OnInit {
	accounts;
	journalEntries;
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this._generalService.setTitle('Dashboard');
	}

	ngOnInit() {
		this.megaMenu = this.route.snapshot.data.menu;
		localStorage.removeItem('activeMenu');
		if (!this.accounts) {
			this.accounts = [];
		}
		this.loadAccounts();
	}

	loadAccounts() {
		this._httpService.post('bank-accounts/view/dash', {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === 'valid') {
				this.accounts = pResults.data;
			}
		});
	}

	loadAccountInformation() { }
}
