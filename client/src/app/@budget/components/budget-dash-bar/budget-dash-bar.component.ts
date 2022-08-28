import { Component, OnInit, Input } from '@angular/core';
// external
import { Chart, ChartPoint, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
// modules
import { ChartOptionsModel } from '@budget/interfaces';

@Component({
	selector: 'acc-budget-dash-bar',
	templateUrl: './budget-dash-bar.component.html',
	styleUrls: ['./budget-dash-bar.component.scss']
})
export class BudgetDashBarComponent implements OnInit {
	@Input() budgetItem;
	@Input() year;
	months: Label[] = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

	public chart: any = {
		type: 'line',
		legend: true,
		options: {
			responsive: true,
			animation: {
				duration: 0
			},
			tooltips: {
				intersect: false,
				mode: 'index',
				bodySpacing: 5,
				xPadding: 10,
				yPadding: 10,
				titleSpacing: 10,
				callbacks: {
					label: (tooltipItem) => {
						return 'R ' + Number(tooltipItem.yLabel).toFixed(2);
					}
				},
			},
			plugins: {
				title: {
					display: true,
					text: (ctx) => 'Tooltip position mode: ' + ctx.chart.options.plugins.tooltip.position,
				},
			}
		},
		plugins: {
			legend: {
				position: 'top',
			},
		},
		colors: [
			{
				backgroundColor: 'rgba(201, 203, 207, 0)',
				borderColor: 'rgb(201, 203, 207)',
			},
			{
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				borderColor: 'rgb(255, 99, 132)',
			}
		]
	};

	constructor(
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) { }

	ngOnInit(): void {
		this.loadBudgetData();
	}

	loadBudgetData() {
		this._httpService.post(`bank-account-records/budget-dash-item`, { budgetId: this.budgetItem._id, year: this.year }).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {

				const data: ChartDataSets[] = [
					{
						label: 'Budget',
						data: [],

					},
					{
						label: 'Actual',
						data: [],

					}
				];

				this.months.forEach((month, index) => {

					data[0].data.push(this.budgetItem.actual);
					let monthData;

					if (pResults.data.length > 0) {
						monthData = pResults.data.filter((record) => {
							const month = (index + 1) < 10 ? '0' + (index + 1) : (index + 1);
							return record.date1.includes(`${this.year}-${month}`);
						});
					}

					if (monthData && monthData.length > 0) {
						let total = 0;
						monthData.forEach(element => {
							total += element.debit;
						});
						data[1].data.push(total * (-1));
					} else {
						data[1].data.push(0);
					}
				})

				this.chart.data = data;
			}
		})
	}
}
