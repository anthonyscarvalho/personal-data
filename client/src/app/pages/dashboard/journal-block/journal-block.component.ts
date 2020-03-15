import { Component, OnInit, Input } from '@angular/core';

// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';

// interfaces
import { JournalsDashboardInterface } from '../../../interfaces/dashboard';

@Component({
	selector: 'app-journal-block',
	templateUrl: './journal-block.component.html',
	styleUrls: ['./journal-block.component.scss']
})
export class JournalBlockComponent implements OnInit {
	@Input() journal;

	accountDetails: JournalsDashboardInterface;

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
		this._httpService.post('journalRecords/sum/' + this.journal._id, {}).then((pRes: any) => {
			if (pRes.status === '00') {
				this.accountDetails = new JournalsDashboardInterface(pRes.data);
				this.accountDetails.accountName = this.journal.accountName;
				this.accountDetails.status = this.journal.canceled;
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
