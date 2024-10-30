export class cTransaction {
	statementId: string;
	accountDescription: string;
	account: string;
	date1: string;
	date2: string;
	description: string;
	amount: number;
	amountOut: number;
	balance: number;
	serviceFee: boolean;

	constructor(pModel: any = null) {
		this.statementId = (pModel ? (pModel.statementId ? pModel.statementId : ``) : ``);
		this.accountDescription = (pModel ? (pModel.accountDescription ? pModel.accountDescription : ``) : ``);
		this.account = (pModel ? (pModel.account ? pModel.account : ``) : ``);
		this.date1 = (pModel ? (pModel.date1 ? pModel.date1 : ``) : ``);
		this.date2 = (pModel ? (pModel.date2 ? pModel.date2 : ``) : ``);
		this.description = (pModel ? (pModel.description ? pModel.description : ``) : ``);
		this.amount = (pModel ? (pModel.amount ? pModel.amount : ``) : ``);
		this.amountOut = (pModel ? (pModel.amountOut ? pModel.amountOut : ``) : ``);
		this.balance = (pModel ? (pModel.balance ? pModel.balance : ``) : ``);
		this.serviceFee = (pModel ? (pModel.serviceFee ? pModel.serviceFee : ``) : ``);
	}
}
