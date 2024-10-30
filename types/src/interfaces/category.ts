import type { tCommonProperties } from "./common-properties";

export type tCategory = {
	_id?: any;
	category: string;
	price: number
	link: string;
} & tCommonProperties;
