import { Component, OnInit, Input } from '@angular/core';

// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';

// interfaces
import { AccountsDashboardInterface } from '../../../interfaces/accounts';

@Component({
	selector: 'app-journal-block',
	templateUrl: './journal-block.component.html',
	styleUrls: ['./journal-block.component.scss']
})
export class JournalBlockComponent implements OnInit {
	@Input() journal;

	accountDetails: AccountsDashboardInterface;

	constructor(
		private _generalService: GeneralService,
		private _httpService: HttpService
	) { }

	ngOnInit() {
		if (this.journal) {
			this.load();
		}
	}

	load() {
		// this._httpService.post('journal/search/' + this.journal._id, {}).then((pRes: any) => {
		// 	if (pRes.status === '00') {
		// 		this.accountDetails = new AccountsDashboardInterface(pRes.data);
		// 		this.accountDetails.accountDescription = this.journal.accountDescription;
		// 		this.accountDetails.accountNumber = this.journal.accountNumber;
		// 		this.accountDetails.status = this.journal.status;
		// 	}
		// });
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
