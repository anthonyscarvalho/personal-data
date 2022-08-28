import { MenuChildrenModel } from '@menu/interfaces';

export interface MenuModel {
	name: string;
	url: string;
	order: number;
	icon: string;
	children?: MenuChildrenModel[];
}
