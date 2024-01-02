export class AccountRecordModel {
	_id?: string;
	statementId: string;
	transactionId: string;
	order: number;
	accountsId: string;
	date1: string;
	year?: string;
	month?: string;
	date2?: string;
	description: string;
	credit: number;
	debit: number;
	balance?: number;
	serviceFee: boolean;
	journal: boolean;
	comments: string;
	processed: boolean;
	originalRecord: string;
	checked?: boolean;
	hash: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.statementId = (pModel ? (pModel.statementId ? pModel.statementId : null) : null);
		this.transactionId = (pModel ? (pModel.transactionId ? pModel.transactionId : null) : null);
		this.order = (pModel ? (pModel.order ? pModel.order : null) : null);
		this.accountsId = (pModel ? (pModel.accountsId ? pModel.accountsId : ``) : ``);
		this.date1 = (pModel ? (pModel.date1 ? pModel.date1 : ``) : ``);
		this.year = (pModel ? (pModel.year ? pModel.year : ``) : ``);
		this.month = (pModel ? (pModel.month ? pModel.month : ``) : ``);
		this.date2 = (pModel ? (pModel.date2 ? pModel.date2 : ``) : ``);
		this.description = (pModel ? (pModel.description ? pModel.description : ``) : ``);
		this.credit = (pModel ? (pModel.credit ? pModel.credit : 0.00) : 0.00);
		this.debit = (pModel ? (pModel.debit ? pModel.debit : 0.00) : 0.00);
		this.balance = (pModel ? (pModel.balance ? pModel.balance : 0.00) : 0.00);
		this.serviceFee = (pModel ? (pModel.serviceFee ? pModel.serviceFee : false) : false);
		this.journal = (pModel ? (pModel.journal ? pModel.journal : false) : false);
		this.comments = (pModel ? (pModel.comments ? pModel.comments : ``) : ``);
		this.processed = (pModel ? (pModel.processed ? pModel.processed : false) : false);
		this.originalRecord = (pModel ? (pModel.originalRecord ? pModel.originalRecord : ``) : ``);
		this.hash = (pModel ? (pModel.hash ? pModel.hash : ``) : ``);
	}
}
