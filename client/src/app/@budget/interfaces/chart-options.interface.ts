import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

export interface ChartOptionsModel {
	options: ChartOptions;
	labels: String[];
	data?: ChartDataset[];
	legend: boolean;
	type: ChartType;
}
