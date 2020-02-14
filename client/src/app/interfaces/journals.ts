export class JournalsViewInterface {
	_id: string;
	accountName: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.accountName = (pModel ? (pModel.accountName ? pModel.accountName : ``) : ``);
	}
}

export class JournalsAddInterface {
	_id: string;
	accountName: string;
	searchParams: string;
	status: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.accountName = (pModel ? (pModel.accountName ? pModel.accountName : ``) : ``);
		this.searchParams = (pModel ? (pModel.searchParams ? pModel.searchParams : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
	}
}
