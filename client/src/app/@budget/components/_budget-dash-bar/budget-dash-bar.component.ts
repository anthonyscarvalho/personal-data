import { Component, OnInit, Input } from '@angular/core';
// external
import { Chart, ChartPoint } from 'chart.js';
import { Color, Label } from 'ng2-charts';
// module
import { IChartOptions } from '@budget/interfaces';

@Component({
	selector: 'acc-budget-dash-bar',
	templateUrl: './budget-dash-bar.component.html',
	styleUrls: ['./budget-dash-bar.component.scss']
})
export class BudgetDashBarComponent implements OnInit {
	@Input() budgetItem;
	@Input() year;
	months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

	public chart: IChartOptions = {
		options: {
			responsive: true,
			animation: null,
			tooltips: {
				intersect: false,
				mode: 'index',
				bodySpacing: 5,
				xPadding: 10,
				yPadding: 10,
				titleSpacing: 10,
				callbacks: {
					label: (tooltipItem) => {
						return 'R' + Number(tooltipItem.yLabel);
					}
				},
			},
			plugins: {
				title: {
					display: true,
					text: (ctx) => 'Tooltip position mode: ' + ctx.chart.options.plugins.tooltip.position,
				},
			},
			elements:
			{
				line:
				{
					fill: false,
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
		},
		labels: this.months,
		legend: true,
		type: 'bar',
		plugins: [],
		colors: [
			{
				backgroundColor: 'rgba(1, 1, 128, 0.4)',
				borderColor: 'rgba(1, 1, 128, 0.4)',
			},
			{
				backgroundColor: 'rgba(5, 171, 5, 1)',
				borderColor: 'rgba(5, 171, 5, 0.4)',
			},
			{
				backgroundColor: 'rgba(245, 7, 7, 1)',
				borderColor: 'rgba(245, 7, 7, 0.4)',
			},
			{
				backgroundColor: 'rgba(75, 224, 232, 1)',
				borderColor: 'rgba(75, 224, 232, 0.4)',
			},
			{
				backgroundColor: 'rgba(255, 128, 0, 1)',
				borderColor: 'rgba(255, 128, 0, 0.4)',
			}
		],
	};

	constructor() { }

	ngOnInit(): void {

		const _budgetData: ChartPoint[] = [];
		this.months.map((map, index) => {
			_budgetData.push({ x: map, y: (10 * index), r: this.budgetItem.budget });
		})

		this.chart.data = [
			{
				data: _budgetData,
				label: 'Budget',
				type: 'line',
			}
		]
	}
}
