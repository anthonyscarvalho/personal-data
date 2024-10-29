import type { tCommonProperties } from "./common-properties";

export type tBudget = {
	_id?: any;
	actual: number;
	breakdown?: tBreakDown[]
	budget: number;
	category: number;
	description: string;
	essential: boolean;
	history?: any[]
	keywords: string;
	status: string;
	budgetData?: tBudgetData[];
} & tCommonProperties;

export type tBreakDown = {
	description: string;
	budget: number;
	status: string;
	created: string;
}

export type tBudgetData = {
	date: string;
	budget: number;
	actual: number;
	payment: number;
}
