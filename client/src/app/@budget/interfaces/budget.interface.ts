import { IGeneric } from '@common/interfaces';
import { BreakDownModel,BudgetDataModel } from '@budget/interfaces';

export class BudgetModel extends IGeneric {
	_id: string;
	actual: number;
	breakdown?: BreakDownModel[]
	budget: number;
	category: number;
	description: string;
	essential: boolean;
	history?: any[]
	keywords: string;
	status: string;
	budgetData?: BudgetDataModel[]

	constructor(pModel: BudgetModel | null = null) {
		super(pModel);

		this._id = pModel?.hasOwnProperty('_id') ? pModel._id : null;
		this.actual = pModel?.hasOwnProperty('actual') ? pModel.actual : null;
		this.breakdown = pModel?.hasOwnProperty('breakdown') ? pModel.breakdown : null;
		this.budget = pModel?.hasOwnProperty('budget') ? pModel.budget : null;
		this.category = pModel?.hasOwnProperty('category') ? pModel.category : null;
		this.description = pModel?.hasOwnProperty('description') ? pModel.description : null;
		this.essential = pModel?.hasOwnProperty('essential') ? pModel.essential : false;
		this.history = pModel?.hasOwnProperty('history') ? pModel.history : null;
		this.keywords = pModel?.hasOwnProperty('keywords') ? pModel.keywords : '';
		this.status = pModel?.hasOwnProperty('status') ? pModel.status : '';
		this.budgetData = pModel?.hasOwnProperty('budgetData') ? pModel.budgetData : [];
	}
}
