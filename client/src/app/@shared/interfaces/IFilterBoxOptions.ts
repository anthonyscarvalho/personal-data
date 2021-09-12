export class IFilterBoxOptions {
	state: string;
	date: Date;
	invoiceFilter: string;
	user: number;
	searchPhrase: string;
	column: string;
	dir: string;
	page: number;
	pagerRecords: string;
	totalRecords: number;

	constructor() {
		this.state = 'active';
		this.date = new Date();
		this.invoiceFilter = '';
		this.user = 0;
		this.searchPhrase = '';
		this.column = '';
		this.dir = '';
		this.page = 1;
		this.pagerRecords = '';
		this.totalRecords = 0;
	}
}
