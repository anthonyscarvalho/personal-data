export type tNavigation = {
	icon: string;
	name: string;
	link: string;
	children?: tNavigation[];
	showChildren?: boolean;
}
