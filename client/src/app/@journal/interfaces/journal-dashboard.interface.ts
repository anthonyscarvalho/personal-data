export class JournalDashboardModel {
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
