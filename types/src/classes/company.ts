export class cCompany {
	_id: string;
	company: string;
	invoiceHeader: string;
	accountDetails: string;
	created: string;
	canceled: string;
	canceledDate: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.company = (pModel ? (pModel.company ? pModel.company : null) : null);
		this.invoiceHeader = (pModel ? (pModel.invoiceHeader ? pModel.invoiceHeader : null) : null);
		this.accountDetails = (pModel ? (pModel.accountDetails ? pModel.accountDetails : null) : null);
		this.created = (pModel ? (pModel.created ? pModel.created : null) : null);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : 'false') : 'false');
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}
