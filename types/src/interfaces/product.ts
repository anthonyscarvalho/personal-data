import type { tCommonProperties } from "./common-properties";

export type tProduct = {
	_id: any;
	description: string;
	price: number;
} & tCommonProperties;
