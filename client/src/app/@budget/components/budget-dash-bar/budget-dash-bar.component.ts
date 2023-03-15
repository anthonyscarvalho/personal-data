import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from "d3"

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
	@ViewChild('svgItem') svgItem: ElementRef;

	private wrapperElement: HTMLElement = undefined;

	private width = 370;
	private height = 250;
	private margin = 20;
	public svg;
	public svgInner;
	public yScale;
	public xScale;
	public xAxis;
	public yAxis;
	public lineGroup;

	public chartData: ChartData = undefined;
	public line1: d3ChartData[] = [];
	private line2: d3ChartData[] = [];
	private labels = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

	constructor(
		public chartElem: ElementRef,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) { }

	ngOnInit(): void { }

	ngAfterViewInit(): void {
		const elem = this.chartElem.nativeElement as HTMLElement;
		this.wrapperElement = elem.querySelector('.line__chart') as HTMLElement;
		this.loadBudgetData();
	}

	private initializeChart(): void {
		this.svg = d3
			.select(this.wrapperElement)
			.append('svg')
			.attr('height', this.height)
			.on("pointerenter", this.pointerentered)
			.on("pointermove", this.pointermoved)
			.on("pointerleave", this.pointerleft);

		this.svgInner = this.svg
			.append('g')
			.style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

		const maxLine = [
			d3.max(this.line1, d => d.value),
			d3.max(this.line2, d => d.value),
		];
		const maxValue = d3.max(maxLine, d => d);

		const minLine = [
			d3.min(this.line1, d => d.value),
			d3.min(this.line2, d => d.value),
		]
		const minValue = d3.max(minLine, d => d);

		this.yScale = d3
			.scaleLinear()
			.domain([maxValue + 1, minValue - 1])
			.range([0, this.height - 2 * this.margin]);

		this.yAxis = this.svgInner
			.append('g')
			.attr('id', 'y-axis')
			.style('transform', 'translate(' + this.margin + 'px,  0)');

		this.xScale = d3.scaleTime().domain(d3.extent(this.line1, d => new Date(d.date)));

		this.xAxis = this.svgInner
			.append('g')
			.attr('id', 'x-axis')
			.style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

		this.lineGroup = this.svgInner
			.append('g')
			.append('path')
			.attr('id', 'line')
			.style('fill', 'none')
			.style('stroke', 'red')
			.style('stroke-width', '2px')
	}

	private drawChart(): void {
		this.width = this.wrapperElement.getBoundingClientRect().width;
		this.svg.attr('width', this.width);

		this.xScale.range([this.margin, this.width - 2 * this.margin]);

		const xAxis = d3
			.axisBottom(this.xScale)
			.ticks(10)
			.tickFormat(d3.timeFormat('%m'));

		this.xAxis.call(xAxis);

		const yAxis = d3
			.axisLeft(this.yScale);

		this.yAxis.call(yAxis);

		const line = d3
			.line()
			.x(d => d[0])
			.y(d => d[1])
			.curve(d3.curveMonotoneX);

		// const points: [number, number][] = this.chartData.map(d => [
		// 	this.xScale(new Date(d.date)),
		// 	this.yScale(d.value),
		// ]);

		// this.lineGroup.attr('d', line(points));
	}

	loadBudgetData() {
		this._httpService.post(`bank-account-records/budget-dash-item`, { budgetId: this.budgetItem._id, year: this.year }).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {

				this.labels.forEach((month, index) => {
					let monthData;
					const _month = (index + 1) < 10 ? '0' + (index + 1) : (index + 1);

					if (pResults.data.length > 0) {
						monthData = pResults.data.filter((record) => {
							return record.date1.includes(`${this.year}-${_month}`);
						});
					}
					this.chartData.labels.push(`${this.year}-${_month}-01`);

					const data: d3ChartData = {
						value: 0,
						date: `${this.year}-${_month}-01`
					}
					let value = 0;

					if (monthData && monthData.length > 0) {
						let total = 0;
						monthData.forEach(element => {
							total += element.debit;
						});
						value = total * (-1);
					}

					this.chartData.actual.push(value);
				});

				this.initializeChart();
				this.drawChart();
			}
		})
	}

	pointermoved(event) {
		const mousePosition = d3.pointer(this);
		const hoveredDate = this.xScale.invert(mousePosition[0]);
		// const [xm, ym] = d3.pointer(event);
		// const i = d3.least(I, i => Math.hypot(this.xScale(X[i]) - xm, this.yScale(Y[i]) - ym)); // closest point
		// path.style("stroke", ([z]) => Z[i] === z ? null : "#ddd").filter(([z]) => Z[i] === z).raise();
		// dot.attr("transform", `translate(${this.xScale(X[i])},${this.yScale(Y[i])})`);
		// if (T) dot.select("text").text(T[i]);
		// svg.property("value", O[i]).dispatch("input", {bubbles: true});
	}

	pointerentered() {
		// path.style("mix-blend-mode", null).style("stroke", "#ddd");
		// dot.attr("display", null);
	}

	pointerleft() {
		// path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
		// dot.attr("display", "none");
		// svg.node().value = null;
		// svg.dispatch("input", {bubbles: true});
	}
}
