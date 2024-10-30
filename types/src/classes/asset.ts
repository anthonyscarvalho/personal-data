import { cCommonProperties } from "./common-properties";

export class cAsset extends cCommonProperties {
	_id?: any;
	name: string;
	type: number;
	status: number;
	make: string;
	model: string;
	imei?: string;
	description: string;
	dateBought: string;
	dateSold: string;
	services?: cVehicleService;

	constructor(pModel = null) {
		super(pModel);
		if (pModel._id) {
			this._id = pModel?._id;
		}
		this.name = pModel?.name || null;
		this.type = pModel?.type || null;
		this.status = pModel?.status || null;
		this.make = pModel?.make || null;
		this.model = pModel?.model || null;
		this.imei = pModel?.imei || null;
		this.description = pModel?.description || null;
		this.dateBought = pModel?.dateBought || null;
		this.dateSold = pModel?.dateSold || null;
		this.services = pModel?.services || null;
	}
}

export class cServiceType {
	name: string;
	id: number;
	order: number;

	constructor(pModel = null) {
		this.name = pModel?.name || null;
		this.id = pModel?.id || null;
		this.order = pModel?.order || null;
	}
};

export class cVehicleService {
	id: string;
	serviceType: string;
	date: string;

	constructor(pModel = null) {
		this.id = pModel?.id || null;
		this.serviceType = pModel?.serviceType || null;
		this.date = pModel?.date || null;
	}
}
