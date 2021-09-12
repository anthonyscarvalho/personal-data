export class IBankAccount {
	_id: string;
	accountNumber: string;
	accountDescription: string;
	status: string;
	canceled: string;
	canceledDate: string;
	dateOpened: string;
	dateClosed: string;
	csvType: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.accountNumber = (pModel ? (pModel.accountNumber ? pModel.accountNumber : ``) : ``);
		this.accountDescription = (pModel ? (pModel.accountDescription ? pModel.accountDescription : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : `false`) : `false`);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : ``) : ``);
		this.dateOpened = (pModel ? (pModel.dateOpened ? pModel.dateOpened : null) : null);
		this.dateClosed = (pModel ? (pModel.dateClosed ? pModel.dateClosed : null) : null);
		this.csvType = (pModel ? (pModel.csvType ? pModel.csvType : ``) : ``);
	}
}
