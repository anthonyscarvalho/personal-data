export class IGeneric {
	canceled: string;
	canceledDate: string;
	created: string
	user: string;

	constructor(pModel: IGeneric | null = null) {
		this.canceled = pModel?.hasOwnProperty('canceled') ? pModel.canceled : '';
		this.canceledDate = pModel?.hasOwnProperty('canceledDate') ? pModel.canceledDate : '';
		this.created = pModel?.hasOwnProperty('created') ? pModel.created : '';
		this.user = pModel?.hasOwnProperty('user') ? pModel.user : '';
	}
}
