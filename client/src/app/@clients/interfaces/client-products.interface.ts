export class ClientProductModel {
	category: string;
	company: string;
	date: string;
	year: number;
	month: number;
	description: string;
	price: number;
	renewable: string;
	period: number;
	created: string;
	canceled: string;
	canceledDate: string;

	constructor(pModel = null) {
		this.category = (pModel ? (pModel.category ? pModel.category : null) : null);
		this.company = (pModel ? (pModel.company ? pModel.company : null) : null);
		this.date = (pModel ? (pModel.date ? pModel.date : null) : null);
		this.year = (pModel ? (pModel.year ? pModel.year : null) : null);
		this.month = (pModel ? (pModel.month ? pModel.month : null) : null);
		this.description = (pModel ? (pModel.description ? pModel.description : null) : null);
		this.price = (pModel ? (pModel.price ? pModel.price : null) : null);
		this.renewable = (pModel ? (pModel.renewable ? pModel.renewable : null) : null);
		this.period = (pModel ? (pModel.period ? pModel.period : null) : null);
		this.created = (pModel ? (pModel.created ? pModel.created : null) : null);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : null) : null);
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}

// export class IClientsProducts {
// 	_id: string;
// 	clients: string;
// 	categories: string;
// 	companies: string;
// 	date: string;
// 	year: number;
// 	month: number;
// 	description: string;
// 	price: number;
// 	renewable: string;
// 	period: number;
// 	canceled: string;
// 	canceledDate: string;

// 	constructor(pModel = null) {
// 		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
// 		this.clients = (pModel ? (pModel.clients ? pModel.clients : null) : null);
// 		this.categories = (pModel ? (pModel.categories ? pModel.categories : null) : null);
// 		this.companies = (pModel ? (pModel.companies ? pModel.companies : null) : null);
// 		this.date = (pModel ? (pModel.date ? pModel.date : null) : null);
// 		this.year = (pModel ? (pModel.year ? pModel.year : null) : null);
// 		this.month = (pModel ? (pModel.month ? pModel.month : null) : null);
// 		this.description = (pModel ? (pModel.description ? pModel.description : null) : null);
// 		this.price = (pModel ? (pModel.price ? pModel.price : null) : null);
// 		this.renewable = (pModel ? (pModel.renewable ? pModel.renewable : null) : null);
// 		this.period = (pModel ? (pModel.period ? pModel.period : null) : null);
// 		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : null) : null);
// 		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
// 	}
// }
