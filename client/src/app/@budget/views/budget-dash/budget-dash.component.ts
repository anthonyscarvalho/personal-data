import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// external
import * as d3 from 'd3';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
// modules
import { CATEGORIES } from '@budget/constants';
import { BudgetModel, BreakDownModel } from '@budget/interfaces';


@Component({
	selector: 'acc-budget-dash',
	templateUrl: './budget-dash.component.html',
	styleUrls: ['./budget-dash.component.scss']
})
export class BudgetDashComponent implements OnInit {
	@ViewChild('barChart') chartContainer: ElementRef;
	megaMenu: any;
	resultRecord: BudgetModel[];
	totalBudget = 0;
	totalEssential = 0
	totalNonEssential = 0;
	submitted = false;
	date = new Date();
	year: number;
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
		this.year = this.date.getFullYear();
		this._generalService.setTitle('Budgets Dash');
		this.load();
	}

	load() {
		this.resultRecord = [];
		this._httpService.post(`budget/dash`, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				if (!this.resultRecord) {
					this.resultRecord = [];
				}
				pResults.data.map((record: BudgetModel) => {
					this.resultRecord.push(new BudgetModel(record))
					if (record.status === 'open') {
						const amount = record.budget;
						this.totalBudget += amount;
						if (record.essential) {
							this.totalEssential += amount;
						} else if (!record.essential) {
							this.totalNonEssential += amount;
						}
					}
				});
			}
		});
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

	updateYear(){
		this.date = new Date(this.year);
		this.load();
	}
}
