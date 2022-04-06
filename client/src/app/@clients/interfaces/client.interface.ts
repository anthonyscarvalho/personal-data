import { ClientProductModel } from '@clients/interfaces';

export class ClientModel {
	_id: string;
	business: string;
	vat: string;
	number: string;
	fax: string;
	billingAddress: string;
	city: string;
	postalCode: string;
	notes: string;
	signupDate: string;
	badClient: string;
	registration: string;
	products?: ClientProductModel[];
	canceled: string;
	canceledDate: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.business = (pModel ? (pModel.business ? pModel.business : null) : null);
		this.vat = (pModel ? (pModel.vat ? pModel.vat : null) : null);
		this.number = (pModel ? (pModel.number ? pModel.number : null) : null);
		this.fax = (pModel ? (pModel.fax ? pModel.fax : null) : null);
		this.billingAddress = (pModel ? (pModel.billingAddress ? pModel.billingAddress : null) : null);
		this.city = (pModel ? (pModel.city ? pModel.city : null) : null);
		this.postalCode = (pModel ? (pModel.postalCode ? pModel.postalCode : null) : null);
		this.notes = (pModel ? (pModel.notes ? pModel.notes : null) : null);
		this.signupDate = (pModel ? (pModel.signupDate ? pModel.signupDate : null) : null);
		this.badClient = (pModel ? (pModel.badClient ? pModel.badClient : null) : null);
		this.registration = (pModel ? (pModel.registration ? pModel.registration : null) : null);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : null) : null);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}
