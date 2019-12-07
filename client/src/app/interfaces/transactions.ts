export class TransactionsInterface {
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
    this.statementId = (pModel.statementId ? pModel.statementId : null);
    this.accountDescription = (pModel.accountDescription ? pModel.accountDescription : null);
    this.account = (pModel.account ? pModel.account : null);
    this.date1 = (pModel.date1 ? pModel.date1 : null);
    this.date2 = (pModel.date2 ? pModel.date2 : null);
    this.description = (pModel.description ? pModel.description : null);
    this.amount = (pModel.amount ? pModel.amount : null);
    this.amountOut = (pModel.amountOut ? pModel.amountOut : null);
    this.balance = (pModel.balance ? pModel.balance : null);
    this.serviceFee = (pModel.serviceFee ? pModel.serviceFee : null);
  }
}
