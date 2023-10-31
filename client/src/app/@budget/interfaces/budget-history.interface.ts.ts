import { BudgetModel } from '@budget/interfaces';

export class BudgetHistoryModel extends BudgetModel {
	date: string;

	constructor(pModel)  {
		super(pModel);
		this.date = (pModel.date ? pModel.date : '');
	}
}
