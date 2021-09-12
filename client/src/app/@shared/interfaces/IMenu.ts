import { IMenuChildren } from '@shared/interfaces/IMenuChildren';

export interface IMenu {
	name: string;
	url: string;
	order: number;
	icon: string;
	children?: IMenuChildren[];
}
