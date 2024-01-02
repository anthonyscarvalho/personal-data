import { AfterViewInit, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
	selector: 'acc-budget-dash-income',
	templateUrl: './budget-dash-income.component.html',
	styleUrls: ['./budget-dash-income.component.scss']
})
export class BudgetDashIncomeComponent implements AfterViewInit, OnInit {
	@Input() monthlyIncome;
	@Input() year;
	@Input() actualBudget;
	@Input() totalBudget;

	public chartId = 'incomeChart';

	private labels = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];
	private budgetActual = [];
	private budgetTotal = [];

	public chart: any;
	constructor(
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit(): void { }

	createChart() {
		this.chart = new Chart(this.chartId, {
			type: 'line', //this denotes tha type of chart

			data: {// values on X-Axis
				labels: this.labels,
				datasets: [
					{
						label: "Income",
						data: this.monthlyIncome.map((income) => income.totalIncome),
						backgroundColor: 'blue'
					},
					{
						label: "Actual",
						data: this.budgetActual,
						backgroundColor: 'limegreen'
					},
					{
						label: "Budget",
						data: this.budgetTotal,
						backgroundColor: 'yellow'
					},
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
		this.labels.forEach((label) => {
			this.budgetActual.push(this.actualBudget);
			this.budgetTotal.push(this.totalBudget);
		})
		this.createChart();
		this.cdr.detectChanges();
	}
}
