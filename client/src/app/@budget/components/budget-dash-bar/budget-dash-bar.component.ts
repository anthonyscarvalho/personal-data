import { Component, OnInit, Input } from '@angular/core';

import { ChartDataset } from 'chart.js';

import { GeneralService, HttpService, NotificationsService } from '@common/services';

import { ChartOptionsModel } from '@budget/interfaces';

@Component({
	selector: 'acc-budget-dash-bar',
	templateUrl: './budget-dash-bar.component.html',
	styleUrls: ['./budget-dash-bar.component.scss']
})
export class BudgetDashBarComponent implements OnInit {
	@Input() budgetItem;
	@Input() year;



	chart: ChartOptionsModel = {
		type: 'line',
		legend: true,
		labels: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`],
		data: [],
		options: {
			interaction: {
				mode: 'index',
				intersect: false,
			},
			plugins: {
				legend: {
					position: 'top'
				},
				tooltip: {
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					displayColors: false,
					padding: 6,
					titleSpacing: 6,
					titleColor: '#ffffff',
					bodyColor: '#ffffff',
					bodyFont: {
						size: 11
					},
					titleFont: {
						size: 13
					},
					callbacks: {
						label: function (context) {
							let label = context.dataset.label || '';

							if (label) {
								label += ': ';
							}
							if (context.parsed.y !== null) {
								label += Number(context.parsed.y).toFixed();
							}
							return label;
						}
					}
				}
			}
		}
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

				const data: ChartDataset[] = [
					{
						label: 'Budget',
						data: [],
						backgroundColor: 'rgba(201, 203, 207, 0)',
						borderColor: 'rgb(201, 203, 207)'

					},
					{
						label: 'Actual',
						data: [],
						backgroundColor: 'rgba(255, 99, 132, 0.5)',
						borderColor: 'rgb(255, 99, 132)'
					}
				];

				this.chart.labels.forEach((month, index) => {

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
