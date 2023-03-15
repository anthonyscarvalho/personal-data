import { VehicleServicesModel } from '@assets/interfaces';

export class AssetsModel {
	_id: string;
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
	services?: VehicleServicesModel;
	canceled: string;
	canceledDate: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.name = (pModel ? (pModel.name ? pModel.name : null) : null);
		this.type = (pModel ? (pModel.type ? pModel.type : null) : null);
		this.status = (pModel ? (pModel.status ? pModel.status : null) : null);
		this.created = (pModel ? (pModel.created ? pModel.created : new Date()) : new Date().toISOString());
		this.make = (pModel ? (pModel.make ? pModel.make : null) : null);
		this.model = (pModel ? (pModel.model ? pModel.model : null) : null);
		this.imei = (pModel ? (pModel.imei ? pModel.imei : null) : null);
		this.description = (pModel ? (pModel.description ? pModel.description : null) : null);
		this.dateBought = (pModel ? (pModel.dateBought ? pModel.dateBought : null) : null);
		this.dateSold = (pModel ? (pModel.dateSold ? pModel.dateSold : null) : null);
		this.services = (pModel ? (pModel.services ? pModel.services : null) : null);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : null) : null);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}



