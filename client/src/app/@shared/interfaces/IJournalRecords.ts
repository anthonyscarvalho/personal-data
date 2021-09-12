export class IJournalRecords {
	_id: string;
	journalId: string;
	accountRecordId: string;
	date: string;
	description: string;
	credit: string;
	debit: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.journalId = (pModel ? (pModel.journalId ? pModel.journalId : ``) : ``);
		this.accountRecordId = (pModel ? (pModel.accountRecordId ? pModel.accountRecordId : ``) : ``);
		this.date = (pModel ? (pModel.date ? pModel.date : ``) : ``);
		this.description = (pModel ? (pModel.description ? pModel.description : `false`) : `false`);
		this.credit = (pModel ? (pModel.credit ? pModel.credit : null) : null);
		this.debit = (pModel ? (pModel.debit ? pModel.debit : null) : null);
	}
}
