import type { tCommonProperties } from "./common-properties";

export type tBankAccount = {
	_id?: any;
	accountNumber: string;
	accountNumbers: tBankAccountNumber[];
	accountDescription: string;
	bank: string;
	status: string;
	dateOpened: string;
	dateClosed: string;
	csvType: string;
	currency: string;
	defaultAccount: string;
	symbol: string;
} & tCommonProperties;


export type tBankAccountNumber = {
	number: string;
	comment: string;
	created: string;
	closed: string;
	status: string;
}

export type tBankAccountDashboard = {
	accountNumber: string;
	accountDescription: string;
	bank: string;
	status: string;
	totalCredit: number;
	totalDebit: number;
	balance: number;
	currency: string;
	symbol: string;
}
