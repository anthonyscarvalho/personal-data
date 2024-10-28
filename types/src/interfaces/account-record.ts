export type tAccountRecord = {
	_id?: any;
	statementId: string;
	transactionId?: string;
	order: number;
	accountsId: string;
	date1: string;
	year?: string;
	month?: string;
	day?: number;
	budgetYear?: string;
	budgetMonth?: string;
	budgetDay?: string;
	date2?: string;
	description: string;
	credit: number;
	debit: number;
	balance?: number;
	serviceFee: boolean;
	journal: boolean;
	comments: string;
	processed: boolean;
	originalRecord: string;
	checked?: boolean;
	hash: string;
}
