export class MenuInterface {
	name: string;
	url: string;
	order: number;
	icon: string;

	constructor(pModel = null) {
		this.name = (pModel ? (pModel.name ? pModel.name : ``) : ``);
		this.url = (pModel ? (pModel.url ? pModel.url : ``) : ``);
		this.order = (pModel ? (pModel.order ? pModel.order : null) : null);
		this.icon = (pModel ? (pModel.icon ? pModel.icon : ``) : ``);
	}
}