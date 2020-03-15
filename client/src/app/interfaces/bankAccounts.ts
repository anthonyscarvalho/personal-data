export class BankAccountsViewInterface {
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

export class BankAccountsAddInterface {
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

export class BankAccountsEditInterface {
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

export class BankAccountRecordsInterface {
	_id: string;
	statementId: string;
	accountsId: string;
	date1: string;
	date2: string;
	description: string;
	credit: string;
	debit: string;
	balance: string;
	serviceFee: string;
	journal: boolean;
	comments: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.statementId = (pModel ? (pModel.statementId ? pModel.statementId : null) : null);
		this.accountsId = (pModel ? (pModel.accountsId ? pModel.accountsId : ``) : ``);
		this.date1 = (pModel ? (pModel.date1 ? pModel.date1 : ``) : ``);
		this.date2 = (pModel ? (pModel.date2 ? pModel.date2 : ``) : ``);
		this.description = (pModel ? (pModel.description ? pModel.description : ``) : ``);
		this.credit = (pModel ? (pModel.credit ? pModel.credit : null) : null);
		this.debit = (pModel ? (pModel.debit ? pModel.debit : null) : null);
		this.balance = (pModel ? (pModel.balance ? pModel.balance : null) : null);
		this.serviceFee = (pModel ? (pModel.serviceFee ? pModel.serviceFee : ``) : ``);
		this.journal = (pModel ? (pModel.journal ? pModel.journal : false) : false);
		this.comments = (pModel ? (pModel.comments ? pModel.comments : ``) : ``);
	}
}
