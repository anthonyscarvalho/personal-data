export class IFilterBoxConfig {
	showStatusFilter?: boolean;
	showSearch?: boolean;
	showPager?: boolean;
	showBankAccounts?: boolean;

	constructor(pModel: IFilterBoxConfig = null) {
		this.showStatusFilter = pModel?.hasOwnProperty('showStatusFilter') ? pModel.showStatusFilter : true;
		this.showSearch = pModel?.hasOwnProperty('showSearch') ? pModel.showSearch : true;
		this.showPager = pModel?.hasOwnProperty('showPager') ? pModel.showPager : true;
		this.showBankAccounts = pModel?.hasOwnProperty('showBankAccounts') ? pModel.showBankAccounts : true;
	}
}
