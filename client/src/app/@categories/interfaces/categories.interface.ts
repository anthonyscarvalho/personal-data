export class CategoryModel {
	_id: string;
	category: string;
	price: number;
	link: string;
	canceled: string;
	canceledDate: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.category = (pModel ? (pModel.category ? pModel.category : null) : null);
		this.price = (pModel ? (pModel.price ? pModel.price : null) : null);
		this.link = (pModel ? (pModel.link ? pModel.link : null) : null);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : null) : null);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}
