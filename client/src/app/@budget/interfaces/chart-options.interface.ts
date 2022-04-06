import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

export interface ChartOptionsModel {
	options: ChartOptions;
	labels: Label;
	data?: ChartDataSets[];
	legend: boolean;
	type: ChartType;
	plugins: [];
	colors?: Color[];
}
