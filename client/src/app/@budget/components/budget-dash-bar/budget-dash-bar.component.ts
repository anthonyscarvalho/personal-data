import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3"
import { Chart } from 'chart.js/auto';
// import { ChartDataset } from 'chart.js';

import { d3ChartData, ChartData } from '@common/interfaces';
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { BudgetModel } from '@budget/interfaces';

// import { ChartOptionsModel } from '@budget/interfaces';

@Component({
	selector: 'acc-budget-dash-bar',
	templateUrl: './budget-dash-bar.component.html',
	styleUrls: ['./budget-dash-bar.component.scss']
})
export class BudgetDashBarComponent implements AfterViewInit, OnInit {
	@Input() budgetItem: BudgetModel;
	@Input() year;

	public line1: d3ChartData[] = [];
	private line2: d3ChartData[] = [];
	private line3: d3ChartData[] = [];
	private labels = [`Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`, `Jan`, `Feb`];

	public chart: any;
	constructor(
		public chartElem: ElementRef,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) { }

	ngOnInit(): void { }

	ngAfterViewInit(): void {
		const elem = this.chartElem.nativeElement as HTMLElement;
		this.loadBudgetData();
	}

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

	loadBudgetData() {
		this.budgetItem.budgetData?.forEach((item) => {
			this.line1.push({
				value: item.budget,
				date: item.date
			});
			this.line2.push({
				value: item.actual,
				date: item.date
			});
			this.line3.push({
				value: item.payment,
				date: item.date
			});
		});
		// this._httpService.post(`bank-account-records/budget-dash-item`, { budgetId: this.budgetItem._id, year: this.year }).then((pResults: any) => {
		// 	const _valid = this._generalService.validateResponse(pResults);
		// 	if (_valid === `valid`) {

		//
		// 		});
		this.createChart();
		// 	}
		// })
	}
}
