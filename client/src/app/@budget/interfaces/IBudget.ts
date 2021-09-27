export class IBudget {
	_id: string;
	description: string;
	status: string;
	budget: number;
	actual: number;
	difference: number;
	essential: boolean;
	category: number;
	keywords: string;
	canceled: string;
	canceledDate: string;
	created: string;
	breakdown?: IBreakDown[]

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.description = (pModel ? (pModel.description ? pModel.description : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
		this.budget = (pModel ? (pModel.budget ? pModel.budget : null) : null);
		this.actual = (pModel ? (pModel.actual ? pModel.actual : null) : null);
		this.difference = (pModel ? (pModel.difference ? pModel.difference : null) : null);
		this.essential = (pModel ? (pModel.essential ? pModel.essential : false) : false);
		this.category = (pModel ? (pModel.category ? pModel.category : null) : null);
		this.keywords = (pModel ? (pModel.keywords ? pModel.keywords : ``) : ``);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : `false`) : `false`);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : ``) : ``);
		this.created = (pModel ? (pModel.created ? pModel.created : null) : null);
		this.breakdown = (pModel ? (pModel.breakdown ? pModel.breakdown : null) : null);
	}
}

export class IBreakDown {
	description: string;
	budget: number;
	status: string;
	created: string;

	constructor(pModel = null) {
		this.description = (pModel ? (pModel.description ? pModel.description : ``) : ``);
		this.budget = (pModel ? (pModel.budget ? pModel.budget : null) : null);
		this.created = (pModel ? (pModel.created ? pModel.created : null) : null);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
	}
}
