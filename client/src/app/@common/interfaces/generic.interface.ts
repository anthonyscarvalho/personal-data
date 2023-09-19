export class IGeneric {
	canceled: string;
	canceledDate: string;

	constructor(pModel: IGeneric | null = null) {
		this.canceled = pModel?.hasOwnProperty('canceled') ? pModel.canceled : '';
		this.canceledDate = pModel?.hasOwnProperty('canceledDate') ? pModel.canceledDate : '';
	}
}
