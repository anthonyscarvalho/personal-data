export class ProductModel {
	_id: string;
	description: string;
	price: number;
	created: string;
	canceled: string;
	canceledDate: string;

	constructor(pModel: any = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.description = (pModel ? (pModel.description ? pModel.description : null) : null);
		this.price = (pModel ? (pModel.price ? pModel.price : null) : null);
		this.created = (pModel ? (pModel.created ? pModel.created : null) : null);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : 'false') : 'false');
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}
