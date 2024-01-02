import { BankAccountNumberModel } from '@bankAccounts/interfaces'

export class BankAccountModel {
	_id: string;
	accountNumber: string;
	accountNumbers: BankAccountNumberModel[];
	accountDescription: string;
	bank: string;
	status: string;
	canceled: string;
	canceledDate: string;
	dateOpened: string;
	dateClosed: string;
	csvType: string;
	currency: string;
	defaultAccount: string;
	symbol: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.accountNumber = (pModel ? (pModel.accountNumber ? pModel.accountNumber : ``) : ``);
		this.accountNumbers = (pModel ? (pModel.accountNumbers ? pModel.accountNumbers : []) : []);
		this.accountDescription = (pModel ? (pModel.accountDescription ? pModel.accountDescription : ``) : ``);
		this.bank = (pModel ? (pModel.bank ? pModel.bank : ``) : ``);
		this.status = (pModel ? (pModel.status ? pModel.status : ``) : ``);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : `false`) : `false`);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : ``) : ``);
		this.dateOpened = (pModel ? (pModel.dateOpened ? pModel.dateOpened : null) : null);
		this.dateClosed = (pModel ? (pModel.dateClosed ? pModel.dateClosed : null) : null);
		this.csvType = (pModel ? (pModel.csvType ? pModel.csvType : ``) : ``);
		this.currency = (pModel ? (pModel.currency ? pModel.currency : ``) : ``);
		this.defaultAccount = (pModel ? (pModel.defaultAccount ? pModel.defaultAccount : ``) : ``);
		this.symbol = (pModel ? (pModel.symbol ? pModel.symbol : ``) : ``);
	}
}
