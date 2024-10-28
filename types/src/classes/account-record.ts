import type { tAccountRecord } from "../interfaces";

export class cAccountRecord implements tAccountRecord {
	_id?: any;
	statementId: string;
	transactionId?: string;
	order: number;
	accountsId: string;
	date1: string;
	year?: string;
	month?: string;
	day?: number;
	budgetYear?: string;
	budgetMonth?: string;
	budgetDay?: string;
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
		if (pModel?._id) {
			this._id = pModel?._id || null;
		}
		this.statementId = pModel?.statementId || null;
		this.transactionId = pModel?.transactionId || null;
		this.order = pModel?.order || null;
		this.accountsId = pModel?.accountsId || null;
		this.date1 = pModel?.date1 || null;
		this.year = pModel?.year || null;
		this.month = pModel?.month || null;
		this.day = pModel?.day || null;
		this.budgetYear = pModel?.budgetYear || null;
		this.budgetMonth = pModel?.budgetMonth || null;
		this.budgetDay = pModel?.budgetDay || null;
		this.date2 = pModel?.date2 || null;
		this.description = pModel?.description || null;
		this.credit = pModel?.credit || null;
		this.debit = pModel?.debit || null;
		this.balance = pModel?.balance || null;
		this.serviceFee = pModel?.serviceFee || null;
		this.journal = pModel?.journal || null;
		this.comments = pModel?.comments || null;
		this.processed = pModel?.processed || null;
		this.originalRecord = pModel?.originalRecord || null;
		this.hash = pModel?.hash || null;
	}
}
