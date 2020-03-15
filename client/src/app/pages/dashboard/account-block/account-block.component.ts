import { Component, OnInit, Input } from '@angular/core';

// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';

// interfaces
import { BankAccountsDashboardInterface } from '../../../interfaces/dashboard';
@Component({
	selector: 'app-account-block',
	templateUrl: './account-block.component.html',
	styleUrls: ['./account-block.component.scss']
})
export class AccountBlockComponent implements OnInit {
	@Input() account;

	accountDetails: BankAccountsDashboardInterface;

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
		this._httpService.post('accountRecords/sum/' + this.account._id, {}).then((pRes: any) => {
			if (pRes.status === '00') {
				this.accountDetails = new BankAccountsDashboardInterface(pRes.data);
				this.accountDetails.accountDescription = this.account.accountDescription;
				this.accountDetails.accountNumber = this.account.accountNumber;
				this.accountDetails.status = this.account.status;
			}
		});
	}

	checkClass(pStatus) {
		if (pStatus === 'open') {
			return 'account-block__status--open'
		} else if (pStatus === 'closed') {
			return 'account-block__status--closed'
		}
	}

	formatNumbers(pNumber) {
		return this._generalService.formatNumbers(pNumber, 2);
	}

}
