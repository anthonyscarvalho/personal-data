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

	journalDetails: JournalsDashboardInterface;

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
		this._httpService.post('journal-records/sum/' + this.journal._id, {}).then((pRes: any) => {
			if (pRes.status === '00') {
				this.journalDetails = new JournalsDashboardInterface(pRes.data);
				this.journalDetails.accountName = this.journal.accountName;
				this.journalDetails.status = this.journal.canceled;
			}
		});
	}

	formatNumbers(pNumber) {
		return this._generalService.formatNumbers(pNumber, 2);
	}

	checkClass(pBalance) {
		if (pBalance === 0) {
			return '';
		} else if (pBalance > 0) {
			return 'journal-block__status--bad';
		} else if (pBalance < 0) {
			return 'journal-block__status--good';
		}
	}
}
