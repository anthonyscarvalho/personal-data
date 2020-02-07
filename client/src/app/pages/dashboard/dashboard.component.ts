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

	accounts: AccountsDashboardInterface[];

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
		this._httpService.post('accounts/view/all', {}).then((pResults: any) => {
			if (pResults.status === '00') {
				pResults.data.map((pAccount: any) => {
					const _account = new AccountsDashboardInterface(pAccount);
					this._httpService.post('accountRecords/sum/' + pAccount._id, {}).then((pRes: any) => {
						if (pRes.status === '00') {
							_account.balance = pRes.data.balance;
							_account.totalCredit = pRes.data.totalCredit;
							_account.totalDebit = pRes.data.totalDebit;
						}
					});
					this.accounts.push(_account);
				});
			}
		});
	}

	loadAccountInformation() {

	}

}
