export class IFilterBoxOptions {
	state?: string;
	date?: Date;
	user?: string;
	searchPhrase?: string;
	column?: string;
	dir?: string;
	page?: number;
	pagerRecords?: string;
	bankAccount?: string;
	totalRecords?: number;

	constructor(pModel: IFilterBoxOptions = null) {
		this.state = pModel?.hasOwnProperty('state') ? pModel.state : 'active';
		this.date = pModel?.hasOwnProperty('date') ? pModel.date : new Date();
		this.bankAccount = pModel?.hasOwnProperty('bankAccount') ? pModel.bankAccount : '';
		this.user = pModel?.hasOwnProperty('user') ? pModel.user : '';
		this.searchPhrase = pModel?.hasOwnProperty('searchPhrase') ? pModel.searchPhrase : '';
		this.column = pModel?.hasOwnProperty('column') ? pModel.column : '';
		this.dir = pModel?.hasOwnProperty('dir') ? pModel.dir : '';
		this.page = pModel?.hasOwnProperty('page') ? pModel.page : 1;
		this.pagerRecords = pModel?.hasOwnProperty('pagerRecords') ? pModel.pagerRecords : '';
		this.totalRecords = pModel?.hasOwnProperty('totalRecords') ? pModel.totalRecords : 0;
	}
}
