export class BankAccountDashboardModel {
	accountNumber: string;
	accountDescription: string;
	status: string;
	totalCredit: number;
	totalDebit: number;
	balance: number;
	currency: string;
	symbol: string;

	constructor(pModel = null) {
		this.accountNumber = (pModel ? (pModel.accountNumber ? pModel.accountNumber : ``) : ``);
		this.accountDescription = (pModel ? (pModel.accountDescription ? pModel.accountDescription : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
		this.totalCredit = (pModel ? (pModel.totalCredit ? pModel.totalCredit : null) : null);
		this.totalDebit = (pModel ? (pModel.totalDebit ? pModel.totalDebit : null) : null);
		this.balance = (pModel ? (pModel.balance ? pModel.balance : null) : null);
		this.currency = (pModel ? (pModel.currency ? pModel.currency : ``) : ``);
		this.symbol = (pModel ? (pModel.symbol ? pModel.symbol : ``) : ``);
	}
}
