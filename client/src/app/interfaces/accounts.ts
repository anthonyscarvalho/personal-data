export class AccountsViewInterface {
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
		this.dateOpened = (pModel ? (pModel.dateOpened ? pModel.dateOpened : ``) : ``);
		this.dateClosed = (pModel ? (pModel.dateClosed ? pModel.dateClosed : ``) : ``);
		this.csvType = (pModel ? (pModel.csvType ? pModel.csvType : ``) : ``);
	}
}

export class AccountsAddInterface {
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
		this.dateOpened = (pModel ? (pModel.dateOpened ? pModel.dateOpened : ``) : ``);
		this.dateClosed = (pModel ? (pModel.dateClosed ? pModel.dateClosed : ``) : ``);
		this.csvType = (pModel ? (pModel.csvType ? pModel.csvType : ``) : ``);
	}
}

export class AccountsDashboardInterface {
	accountNumber: string;
	accountDescription: string;
	status: string;
	totalCredit: number;
	totalDebit: number;
	balance: number;

	constructor(pModel = null) {
		this.accountNumber = (pModel ? (pModel.accountNumber ? pModel.accountNumber : ``) : ``);
		this.accountDescription = (pModel ? (pModel.accountDescription ? pModel.accountDescription : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
		this.totalCredit = (pModel ? (pModel.totalCredit ? pModel.totalCredit : null) : null);
		this.totalDebit = (pModel ? (pModel.totalDebit ? pModel.totalDebit : null) : null);
		this.balance = (pModel ? (pModel.balance ? pModel.balance : null) : null);
	}
}
