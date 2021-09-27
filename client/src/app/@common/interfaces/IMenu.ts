import { IMenuChildren } from '@common/interfaces';

export interface IMenu {
	name: string;
	url: string;
	order: number;
	icon: string;
	children?: IMenuChildren[];
}
