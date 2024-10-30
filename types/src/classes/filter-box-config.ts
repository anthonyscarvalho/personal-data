export class cFilterBoxConfig {
	showStatusFilter: boolean;
	showSearch: boolean;
	showPager: boolean;
	showBankAccounts: boolean;
	pagerTotal: number;
	updateControls: boolean;
	extraControls: boolean;
	create: boolean;
	backLink?: string;

	constructor(pModel = null) {
		this.showStatusFilter = pModel?.showStatusFilter || true;
		this.showSearch = pModel?.showSearch || true;
		this.showPager = pModel?.showPager || true;
		this.showBankAccounts = pModel?.showBankAccounts || true;
		this.pagerTotal = pModel?.pagerTotal || 0;
		this.updateControls = pModel?.updateControls || false;
		this.extraControls = pModel?.extraControls || false;
		this.create = pModel?.create || false;
	}
}
