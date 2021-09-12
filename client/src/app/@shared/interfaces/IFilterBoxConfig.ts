export class IFilterBoxConfig {
	showStatusFilter: boolean;
	showSearch: boolean;
	showPager: boolean;
	pagerTotal: number;
	updateControls: boolean;
	create: boolean;
	backLink?: string;

	constructor() {
		this.showStatusFilter = true;
		this.showSearch = true;
		this.showPager = true;
		this.pagerTotal = 0;
		this.updateControls = false;
		this.create = false;
	}
}
