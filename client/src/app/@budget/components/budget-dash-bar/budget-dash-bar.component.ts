import { AfterViewInit, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
// common
import { GeneralService, HttpService } from '@common/services';

import { BudgetModel, BudgetDataModel } from '@budget/interfaces';

@Component({
	selector: 'acc-budget-dash-bar',
	templateUrl: './budget-dash-bar.component.html',
	styleUrls: ['./budget-dash-bar.component.scss']
})
export class BudgetDashBarComponent implements AfterViewInit, OnInit {
	@Input() budgetItem: BudgetModel;
	@Input() year;

	private labels = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];
	private resultRecord: BudgetDataModel[];
	public chart: any;

	constructor(
		private cdr: ChangeDetectorRef,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) { }

	ngOnInit(): void { }

	loadData() {
		this.resultRecord = [];
		this._httpService.post(`budget/budget_data`, { year: this.year, budgetItem: this.budgetItem }).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.resultRecord = pResults.data;

				this.createChart();
				this.cdr.detectChanges();
			}
		});
	}

	createChart() {
		this.chart = new Chart(this.budgetItem._id, {
			type: 'line', //this denotes tha type of chart

			data: {// values on X-Axis
				labels: this.labels,
				datasets: [
					{
						label: "Budget",
						data: this.resultRecord.map((budget) => budget.budget),
						backgroundColor: 'blue'
					},
					{
						label: "Actual",
						data: this.resultRecord.map((budget) => budget.actual),
						backgroundColor: 'limegreen'
					},
					{
						label: "Payment",
						data: this.resultRecord.map((budget) => budget.payment),
						backgroundColor: 'yellow'
					}
				]
			},
			options: {
				aspectRatio: 2.5,
				interaction: {
					// Overrides the global setting
					mode: 'index',
					intersect: false
				}
			}

		});
	}

	ngAfterViewInit(): void {
		this.loadData();
	}
}
