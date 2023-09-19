import { IGeneric } from './generic.interface';

export class IMedia extends IGeneric {
	contentType: string;
	date: string;
	description: string;
	documentType: string;
	entityId: string;
	fileHash: string;
	fileMeta: any;
	fileName: string;
	filePath: string;
	fileSize: number | null;
	labels: string[];
	name: string;
	year: number | null;

	constructor(pModel: IMedia | null = null) {
		super(pModel);

		this.contentType = pModel?.hasOwnProperty('contentType') ? pModel.contentType : '';
		this.date = pModel?.hasOwnProperty('date') ? pModel.date : '';
		this.description = pModel?.hasOwnProperty('description') ? pModel.description : '';
		this.documentType = pModel?.hasOwnProperty('documentType') ? pModel.documentType : '';
		this.entityId = pModel?.hasOwnProperty('entityId') ? pModel.entityId : '';
		this.fileHash = pModel?.hasOwnProperty('fileHash') ? pModel.fileHash : '';
		this.fileMeta = pModel?.hasOwnProperty('fileMeta') ? pModel.fileMeta : 'active';
		this.fileName = pModel?.hasOwnProperty('fileName') ? pModel.fileName : '';
		this.filePath = pModel?.hasOwnProperty('filePath') ? pModel.filePath : '';
		this.fileSize = pModel?.hasOwnProperty('fileSize') ? pModel.fileSize : null;
		this.labels = pModel?.hasOwnProperty('labels') ? pModel.labels : [];
		this.name = pModel?.hasOwnProperty('name') ? pModel.name : '';
		this.year = pModel?.hasOwnProperty('year') ? pModel.year : null;
	}
}
