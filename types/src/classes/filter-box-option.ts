export class cFilterBoxOption {
	state: string;
	date: Date;
	invoiceFilter: string;
	displayType: string;
	searchPhrase: string;
	column: string;
	bankAccount: string;
	dir: string;
	user: string;
	page: number;
	pagerRecords: string;
	totalRecords: number;

	constructor(pModel = null) {
		this.state = pModel?.state || 'false';
		this.date = pModel?.date || new Date();
		this.invoiceFilter = pModel?.invoiceFilter || '';
		this.displayType = pModel?.displayType || 'grid';
		this.searchPhrase = pModel?.searchPhrase || '';
		this.column = pModel?.column || '';
		this.bankAccount = pModel?.bankAccount || '';
		this.user = pModel?.user || '';
		this.dir = pModel?.dir || '';
		this.page = pModel?.page || 1;
		this.pagerRecords = pModel?.pagerRecords || '24';
		this.totalRecords = pModel?.totalRecords || 0;
	}
}
