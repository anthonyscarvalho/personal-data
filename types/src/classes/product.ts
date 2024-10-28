import { CommonProperties } from "./common";
import type { tProduct } from "../interfaces";

export class cProduct extends CommonProperties implements tProduct {
	_id: any;
	description: string;
	price: number;

	constructor(pModel: any = null) {
		super(pModel);
		if (pModel?._id) {
			this._id = pModel?._id || null;
		}
		this.description = pModel?.description || null;
		this.price = pModel?.price || null;
	}
}
