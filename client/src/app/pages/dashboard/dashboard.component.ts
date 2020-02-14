import { Component, OnInit } from '@angular/core';
// services
import { GeneralService } from '../../services/general.service';
import { HttpService } from '../../services/http.service';
// interfaces
import { AccountsDashboardInterface } from '../../interfaces/accounts';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	accounts;
	journalEntries;

	constructor(
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this._generalService.setTitle('Dashboard');
	}

	ngOnInit() {
		localStorage.removeItem('activeMenu');
		if (!this.accounts) {
			this.accounts = [];
		}
		this.loadAccounts();
	}

	loadAccounts() {
		this._httpService.post('accounts/view/dash', {}).then((pResults: any) => {
			if (pResults.status === '00') {
				this.accounts = pResults.data;
			}
			return this._httpService.post('journals/view/dash', {});
		}).then((pResults: any) => {
			if (pResults.status === '00') {
				this.journalEntries = pResults.data;
			}
		});
	}

	loadAccountInformation() {

	}

}
