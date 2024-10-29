export class cCommonProperties {
	created: string;
	canceled: string;
	canceledDate: string;
	user?: string;

	constructor(pModel: any = null) {
		this.created = pModel?.created || '';
		this.canceled = pModel?.canceled || 'false';
		this.canceledDate = pModel?.canceledDate || null;
		if (pModel?.user) {
			this.user = pModel?.user || null;
		}
	}
}
