export class cFilterBoxConfig {
	showStatusFilter: boolean;
	showSearch: boolean;
	showPager: boolean;
	pagerTotal: number;
	updateControls: boolean;
	extraControls: boolean;
	create: boolean;
	backLink?: string;

	constructor() {
		this.showStatusFilter = true;
		this.showSearch = true;
		this.showPager = true;
		this.pagerTotal = 0;
		this.updateControls = false;
		this.extraControls = false;
		this.create = false;
	}
}
