import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GeneralService, HttpService, NotificationsService } from '@common/services';

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
		private router: Router,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this._generalService.setTitle('Dashboard');
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit() {
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

	editAccountRouter(pId) {
		this.router.navigate(['/bank-accounts/edit/' + pId], { relativeTo: this.route });
	}
}
