export class BankAccountNumberModel {
	number: string;
	comment: string;
	created: string;
	closed: string;
	status: string;

	constructor(pModel = null) {
		this.number = (pModel ? (pModel.number ? pModel.number : null) : null);
		this.comment = (pModel ? (pModel.comment ? pModel.comment : null) : null);
		this.created = (pModel ? (pModel.created ? pModel.created : ``) : ``);
		this.closed = (pModel ? (pModel.closed ? pModel.closed : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
	}
}
