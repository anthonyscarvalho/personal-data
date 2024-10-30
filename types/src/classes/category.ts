import { cCommonProperties } from "./common-properties";

export class cCategory extends cCommonProperties {
	_id?: any;
	category: string;
	price: number;
	link: string;

	constructor(pModel = null) {
		super(pModel);
		if (pModel?._id) {
			this._id = pModel._id;
		}
		this.category = pModel.category || null
		this.price = pModel.price || null
		this.link = pModel.link || null
	}
}
