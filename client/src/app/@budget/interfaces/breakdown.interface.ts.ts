export class BreakDownModel {
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
