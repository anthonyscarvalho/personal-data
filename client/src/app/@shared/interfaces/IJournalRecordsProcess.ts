export class IJournalRecordsProcess {
	journalId: string;
	accountRecordId: string;
	date: string;
	description: string;
	credit: string;
	debit: string;

	constructor(pModel = null) {
		this.journalId = (pModel ? (pModel.journalId ? pModel.journalId : ``) : ``);
		this.accountRecordId = (pModel ? (pModel._id ? pModel._id : ``) : ``);
		this.date = (pModel ? (pModel.date1 ? pModel.date1 : ``) : ``);
		this.description = (pModel ? (pModel.description ? pModel.description : `false`) : `false`);
		this.credit = (pModel ? (pModel.credit ? pModel.credit : null) : null);
		this.debit = (pModel ? (pModel.debit ? pModel.debit : null) : null);
	}
}
