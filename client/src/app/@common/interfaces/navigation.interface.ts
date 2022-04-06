export interface INavigation {
	icon: string;
	name: string;
	link: string;
	children?: INavigation[];
	showChildren?: boolean;
}
