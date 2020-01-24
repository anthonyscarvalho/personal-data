export class AccountRecordsInterface {
  _id: string;
  accountsId: string;
  date1: string;
  date2: string;
  description: string;
  credit: string;
  debit: string;
  journal: boolean;

  constructor(pModel = null) {
    this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
    this.accountsId = (pModel ? (pModel.accountsId ? pModel.accountsId : ``) : ``);
    this.date1 = (pModel ? (pModel.date1 ? pModel.date1 : ``) : ``);
    this.date2 = (pModel ? (pModel.date2 ? pModel.date2 : ``) : ``);
    this.description = (pModel ? (pModel.description ? pModel.description : `false`) : `false`);
    this.credit = (pModel ? (pModel.credit ? pModel.credit : ``) : ``);
    this.debit = (pModel ? (pModel.debit ? pModel.debit : ``) : ``);
    this.journal = (pModel ? (pModel.journal ? pModel.journal : false) : false);
  }
}
