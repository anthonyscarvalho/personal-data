export class cEnumType {
	_id: string;
	enumType: number;
	name: string;
	description: string;
	order: number;
	image: string;

	constructor(pModel = null) {
		if (pModel?._id) {
			this._id = pModel?._id || null;
		}
		this.enumType = pModel?.enumType || null;
		this.name = pModel?.name || null;
		this.description = pModel?.description || null;
		this.order = pModel?.order || null;
		this.image = pModel?.image || null;
	}
}
