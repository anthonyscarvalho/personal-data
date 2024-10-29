import { CommonProperties } from "./common";
import type { tBankAccount, tBankAccountNumber, tBankAccountDashboard } from "../interfaces";

export class cBankAccount extends CommonProperties implements tBankAccount {
	_id?: any;
	accountNumber: string;
	accountNumbers: cBankAccountNumber[];
	accountDescription: string;
	bank: string;
	status: string;
	dateOpened: string;
	dateClosed: string;
	csvType: string;
	currency: string;
	defaultAccount: string;
	symbol: string;

	constructor(pModel = null) {
		super(pModel);
		if (pModel?._id) {
			this._id = pModel?._id || null;
		}
		this.accountNumber = pModel?.accountNumber || '';
		this.accountNumbers = pModel?.accountNumbers || [];
		this.accountDescription = pModel?.accountDescription || '';
		this.bank = pModel?.bank || '';
		this.status = pModel?.status || '';
		this.dateOpened = pModel?.dateOpened || null;
		this.dateClosed = pModel?.dateClosed || null;
		this.csvType = pModel?.csvType || '';
		this.currency = pModel?.currency || '';
		this.defaultAccount = pModel?.defaultAccount || '';
		this.symbol = pModel?.symbol || '';
	}
}

export class cBankAccountNumber implements tBankAccountNumber {
	number: string;
	comment: string;
	created: string;
	closed: string;
	status: string;

	constructor(pModel = null) {
		this.number = pModel?.number || null;
		this.comment = pModel?.comment || null;
		this.created = pModel?.created || '';
		this.closed = pModel?.closed || '';
		this.status = pModel?.status || '';
	}
}

export class cBankAccountDashboard implements tBankAccountDashboard {
	accountNumber: string;
	accountDescription: string;
	bank: string;
	status: string;
	totalCredit: number;
	totalDebit: number;
	balance: number;
	currency: string;
	symbol: string;

	constructor(pModel = null) {
		this.accountNumber = pModel?.accountNumber || '';
		this.accountDescription = pModel?.accountDescription || '';
		this.bank = pModel?.bank || '';
		this.status = pModel?.status || '';
		this.totalCredit = pModel?.totalCredit || null;
		this.totalDebit = pModel?.totalDebit || null;
		this.balance = pModel?.balance || null;
		this.currency = pModel?.currency || '';
		this.symbol = pModel?.symbol || '';
	}
}
