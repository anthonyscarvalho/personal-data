export class JournalsViewInterface {
	_id: string;
	accountName: string;
	accountNumber: string;
	status: string;
	canceled: string;
	canceledDate: Date;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.accountName = (pModel ? (pModel.accountName ? pModel.accountName : ``) : ``);
		this.accountNumber = (pModel ? (pModel.accountNumber ? pModel.accountNumber : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : `false`) : `false`);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}

export class JournalsAddInterface {
	_id: string;
	accountName: string;
	accountNumber: string;
	searchParams: string;
	status: string;
	canceled: string;
	canceledDate: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.accountName = (pModel ? (pModel.accountName ? pModel.accountName : ``) : ``);
		this.accountNumber = (pModel ? (pModel.accountNumber ? pModel.accountNumber : ``) : ``);
		this.searchParams = (pModel ? (pModel.searchParams ? pModel.searchParams : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : `false`) : `false`);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}