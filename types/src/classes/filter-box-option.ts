export class cFilterBoxOption {
	state: string;
	date: Date;
	invoiceFilter: string;
	displayType: string;
	user: number;
	searchPhrase: string;
	column: string;
	dir: string;
	page: number;
	pagerRecords: string;
	totalRecords: number;

	constructor(pModel = null) {
		this.state = pModel ? pModel.state : 'false';
		this.date = pModel ? pModel.date : new Date();
		this.invoiceFilter = pModel ? pModel.invoiceFilter : '';
		this.displayType = pModel ? pModel.displayType : 'grid';
		this.user = pModel ? pModel.user : 0;
		this.searchPhrase = pModel ? pModel.searchPhrase : '';
		this.column = pModel ? pModel.column : '';
		this.dir = pModel ? pModel.dir : '';
		this.page = pModel ? pModel.page : 1;
		this.pagerRecords = pModel ? pModel.pagerRecords : '24';
		this.totalRecords = pModel ? pModel.totalRecords : 0;
	}
}
