import { AfterViewInit, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { BudgetModel } from '@budget/interfaces';

@Component({
	selector: 'acc-budget-dash-bar',
	templateUrl: './budget-dash-bar.component.html',
	styleUrls: ['./budget-dash-bar.component.scss']
})
export class BudgetDashBarComponent implements AfterViewInit, OnInit {
	@Input() budgetItem: BudgetModel;
	@Input() year;

	private labels = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

	public chart: any;
	constructor(
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit(): void { }

	createChart() {
		this.chart = new Chart(this.budgetItem._id, {
			type: 'line', //this denotes tha type of chart

			data: {// values on X-Axis
				labels: this.labels,
				datasets: [
					{
						label: "Budget",
						data: this.budgetItem.budgetData.map((budget) => budget.budget),
						backgroundColor: 'blue'
					},
					{
						label: "Actual",
						data: this.budgetItem.budgetData.map((budget) => budget.actual),
						backgroundColor: 'limegreen'
					},
					{
						label: "Payment",
						data: this.budgetItem.budgetData.map((budget) => budget.payment),
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
		this.createChart();
		this.cdr.detectChanges();
	}
}
