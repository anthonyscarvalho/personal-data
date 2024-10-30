export class cMenu {
	name: string;
	url: string;
	order: number;
	icon: string;
	children?: cMenu[];

	constructor(pModel = null) {
		this.name = pModel?.name || null;
		this.url = pModel?.url || null;
		this.order = pModel?.order || null;
		this.icon = pModel?.icon || null;
		this.children = pModel?.children || [];
	}
}
