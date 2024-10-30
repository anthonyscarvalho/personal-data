export class cJournal {
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

export class cJournalDashboard {
	accountName: string;
	status: string;
	totalCredit: number;
	totalDebit: number;
	balance: number;

	constructor(pModel = null) {
		this.accountName = (pModel ? (pModel.accountName ? pModel.accountName : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
		this.totalCredit = (pModel ? (pModel.totalCredit ? pModel.totalCredit : null) : null);
		this.totalDebit = (pModel ? (pModel.totalDebit ? pModel.totalDebit : null) : null);
		this.balance = (pModel ? (pModel.balance ? pModel.balance : null) : null);
	}
}
