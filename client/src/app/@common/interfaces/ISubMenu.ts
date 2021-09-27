export class ISubMenu {
	name: string;
	url: string;

	constructor(pModel = null) {
		this.name = (pModel ? (pModel.name ? pModel.name : ``) : ``);
		this.url = (pModel ? (pModel.url ? pModel.url : ``) : ``);
	}
}
