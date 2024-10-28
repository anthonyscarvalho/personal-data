export class CommonProperties {
	created: string;
	canceled: string;
	canceledDate: string;

	constructor(pModel: any = null) {
		this.created = pModel?.created || '';
		this.canceled = pModel?.canceled || 'false';
		this.canceledDate = pModel?.canceledDate || null;
	}
}
