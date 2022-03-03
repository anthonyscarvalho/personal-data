import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// external
import * as d3 from 'd3';
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
	@ViewChild('barChart') chartContainer: ElementRef;
	megaMenu: any;
	resultRecord: IBudget[];
	totalBudget = 0;
	totalEssential = 0
	totalNonEssential = 0;
	submitted = false;
	year: string;
	dateEnd: string;

	margin = { top: 20, right: 20, bottom: 30, left: 40 };

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit(): void {
		this.year = this._generalService.formatDate(new Date(), 'yyyy');
		this._generalService.setTitle('Budgets Dash');
		this.load();
	}

	load() {
		this._httpService.post(`budget/dash`, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				if (!this.resultRecord) {
					this.resultRecord = [];
				}
				pResults.data.map((record: IBudget) => {
					this.resultRecord.push(new IBudget(record))
					if (record.status === 'open') {
						const amount = (record.actual) ? record.actual : record.budget;
						this.totalBudget += amount;
						if (record.essential) {
							this.totalEssential += amount;
						} else if (!record.essential) {
							this.totalNonEssential += amount;
						}
					}
				});
			}
		})
	}

	updateValue(pEvent, pChangeType) {
		switch (pChangeType) {
			case `year`:
				this.year = pEvent;
				break;
		}
	}
}
