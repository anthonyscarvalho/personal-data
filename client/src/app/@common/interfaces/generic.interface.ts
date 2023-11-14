export class IGeneric {
	canceled: boolean;
	canceledDate: string;
	created: string
	user: string;

	constructor(pModel: IGeneric | null = null) {
		this.canceled = pModel?.hasOwnProperty('canceled') ? pModel.canceled : false;
		this.canceledDate = pModel?.hasOwnProperty('canceledDate') ? pModel.canceledDate : '';
		this.created = pModel?.hasOwnProperty('created') ? pModel.created : '';
		this.user = pModel?.hasOwnProperty('user') ? pModel.user : '615e879287981a177438a84c';
	}
}
