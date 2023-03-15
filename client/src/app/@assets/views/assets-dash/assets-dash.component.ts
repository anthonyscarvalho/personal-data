import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-assets-dash',
	templateUrl: './assets-dash.component.html',
	styleUrls: ['./assets-dash.component.scss']
})
export class AssetsDashComponent implements OnInit {
	megaMenu: any;
	date = new Date();
	year: number;
	dateEnd: string;
	// resultRecord: BudgetModel[];

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit(): void {
		this.year = this.date.getFullYear();
		this._generalService.setTitle('Assets Dash');
		this.load();
	}

	load() {
		// this.resultRecord = [];
		// this._httpService.post(`budget/dash`, {}).then((pResults: any) => {
		// 	const _valid = this._generalService.validateResponse(pResults);
		// 	if (_valid === `valid`) {
		// 		if (!this.resultRecord) {
		// 			this.resultRecord = [];
		// 		}
		// 		pResults.data.map((record: BudgetModel) => {
		// 			this.resultRecord.push(new BudgetModel(record))
		// 			if (record.status === 'open') {
		// 				const amount = record.actual;
		// 			}
		// 		});
		// 	}
		// });
	}

	nextYear() {
		this.date.setFullYear(this.date.getFullYear() + 1);
		this.year = this.date.getFullYear();
		this.load();
	}

	previousYear() {
		this.date.setFullYear(this.date.getFullYear() - 1);
		this.year = this.date.getFullYear();
		this.load();
	}

	updateYear() {
		this.date = new Date(this.year);
		this.load();
	}
}
