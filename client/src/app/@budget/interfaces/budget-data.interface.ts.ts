export class BudgetDataModel {
	date: string;
	budget: number;
	actual: number;
	payment: number;

	constructor(pModel: BudgetDataModel | null = null) {
		this.date = pModel?.hasOwnProperty('date') ? pModel.date : null;
		this.budget = pModel?.hasOwnProperty('budget') ? pModel.budget : null;
		this.actual = pModel?.hasOwnProperty('actual') ? pModel.actual : null;
		this.payment = pModel?.hasOwnProperty('payment') ? pModel.payment : null;
	}
}
