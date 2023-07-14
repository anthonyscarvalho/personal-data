import { Component, OnInit, Input } from '@angular/core';

// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
// modules
import { BankAccountDashboardModel } from '@bankAccounts/interfaces';

@Component({
	selector: 'acc-bank-accounts-dash-block',
	templateUrl: './bank-accounts-dash-block.component.html',
	styleUrls: ['./bank-accounts-dash-block.component.scss']
})
export class BankAccountsDashBlockComponent implements OnInit {
	@Input() account;

	accountDetails: BankAccountDashboardModel;

	constructor(
		private _generalService: GeneralService,
		private _httpService: HttpService
	) { }

	ngOnInit() {
		if (this.account) {
			this.load();
		}
	}

	load() {
		this._httpService.post('bank-account-records/sum/' + this.account._id, {}).then((pRes: any) => {
			if (pRes.status === '00') {
				this.accountDetails = new BankAccountDashboardModel(pRes.data);
				this.accountDetails.accountDescription = this.account.accountDescription;
				this.accountDetails.accountNumber = this.account.accountNumber;
				this.accountDetails.status = this.account.status;
				this.accountDetails.symbol = this.account.symbol || '';
				this.accountDetails.currency = this.account.currency || '';
			}
		});
	}

	formatNumbers(pNumber) {
		return this._generalService.formatNumbers(pNumber, 2);
	}
}
