// // import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { cCommonProperties } from './common-properties';

export class cBudget extends cCommonProperties {
	_id?: any;
	actual: number;
	breakdown?: cBreakDown[]
	budget: number;
	category: number;
	description: string;
	essential: boolean;
	history?: any[]
	keywords: string;
	status: string;
	budgetData?: cBudgetData[];

	constructor(pModel = null) {
		super(pModel);
		if (pModel?._id) {
			this._id = pModel?._id || null;
		}
		this.actual = pModel?.actual || null;
		this.breakdown = pModel?.breakdown || null;
		this.budget = pModel?.budget || null;
		this.category = pModel?.category || null;
		this.description = pModel?.description || null;
		this.essential = pModel?.essential || null;
		this.history = pModel?.history || null;
		this.keywords = pModel?.keywords || null;
		this.status = pModel?.status || null;
		this.budgetData = pModel?.budgetData || null;
	}
}

export class cBarChart {
	x: string;
	y: number;
	average: number;
}

export class cBreakDown {
	description: string;
	budget: number;
	status: string;
	created: string;

	constructor(pModel = null) {
		this.description = pModel?.description || '';
		this.budget = pModel?.budget || null;
		this.created = pModel?.created || null;
		this.status = pModel?.status || '';
	}
}

export class cBudgetData {
	date: string;
	budget: number;
	actual: number;
	payment: number;

	constructor(pModel = null) {
		this.date = pModel?.date || null;
		this.budget = pModel?.budget || null;
		this.actual = pModel?.actual || null;
		this.payment = pModel?.payment || null;
	}
}


export class cBudgetHistory extends cBudget {
	date: string;

	constructor(pModel) {
		super(pModel);
		this.date = pModel?.date || '';
	}
}
