import type { tCommonProperties } from "./common-properties";

export type tAsset = {
	_id?: any;
	name: string;
	type: number;
	status: number;
	created: string;
	make: string;
	model: string;
	imei?: string;
	description: string;
	dateBought: string;
	dateSold: string;
	services?: tVehicleService;
} & tCommonProperties;

export type tServiceType = {
	name: string;
	id: number;
	order: number;
}

export type tVehicleService = {
	id: string;
	serviceType: string;
	date: string;
}
