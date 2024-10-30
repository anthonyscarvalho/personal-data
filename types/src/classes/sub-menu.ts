export class cSubMenu {
	name: string;
	url: string;

	constructor(pModel = null) {
		this.name = pModel?.name || ``;
		this.url = pModel?.name || ``;
	}
}
