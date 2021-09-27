import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
// module
import { IBudget, IBreakDown } from '@budget/interfaces';
import { CATEGORIES } from '@budget/constants';


@Component({
	selector: 'acc-budget-dash',
	templateUrl: './budget-dash.component.html',
	styleUrls: ['./budget-dash.component.scss']
})
export class BudgetDashComponent implements OnInit {
	megaMenu: any;
	resultRecord: IBudget[];
	totalBudget: number = 0;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit(): void {
		this._generalService.setTitle('Budget Dash');
		this.load();
	}

	load() {
		this._httpService.post(`budget/dash`, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				if (!this.resultRecord) {
					this.resultRecord = [];
				}
				pResults.data.map((record) => {
					this.resultRecord.push(new IBudget(record))
					if (record.status === 'open') {
						this.totalBudget += (record.actual) ? record.actual : record.budget;
					}
				});
			}
		});
	}

}
