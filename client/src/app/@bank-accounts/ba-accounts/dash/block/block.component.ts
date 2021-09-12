import { Component, OnInit, Input } from '@angular/core';

// services
import { GeneralService } from '../../../../services/general.service';
import { HttpService } from '../../../../services/http.service';

// interfaces
import { IBankAccountsDashboard } from '../../../../interfaces/bankAccounts';
@Component({
	selector: 'app-ba-dash-block',
	templateUrl: './block.component.html',
	styleUrls: ['./block.component.scss']
})
export class BaBlockComponent implements OnInit {
	@Input() account;

	accountDetails: IBankAccountsDashboard;

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
				this.accountDetails = new IBankAccountsDashboard(pRes.data);
				this.accountDetails.accountDescription = this.account.accountDescription;
				this.accountDetails.accountNumber = this.account.accountNumber;
				this.accountDetails.status = this.account.status;
			}
		});
	}

	formatNumbers(pNumber) {
		return this._generalService.formatNumbers(pNumber, 2);
	}
}
