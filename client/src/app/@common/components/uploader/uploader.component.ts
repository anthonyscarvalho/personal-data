import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

import exifr from 'exifr' // => exifr/dist/full.umd.cjs
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FileUploader } from 'ng2-file-upload'
// import * as PDFJS from 'pdfjs-dist';

import { DOCUMENT_TYPE } from '@sharedTypes/enums';
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: `acc-uploader`,
	templateUrl: `./uploader.component.html`,
	styleUrls: [`./uploader.component.scss`]
})
export class UploaderComponent implements OnInit, AfterViewInit {
	@Input() upload;
	@Input() entityId = '';
	@Input() dateOverride = null;
	@Output(`updater`) _updater = new EventEmitter<any>();

	@ViewChild(`filePicker`) _file: ElementRef;

	documentTypes = DOCUMENT_TYPE;

	imageExtensions: string[] = [`jpg`, `jpeg`, `png`, `gif`, `svg`, `webp`];
	documentExtensions: string[] = [`doc`, `docx`];
	movieExtensions: string[] = [`avi`, `mp4`, `mkv`, `webm`];

	uploader: FileUploader = new FileUploader({ url: environment.baseUrl + `/utilities/documentUpload`, itemAlias: `documentProcessor` });
	hasBaseDropZoneOver: boolean;
	response: string;
	submitted: false;

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

	constructor(
		private datePipe: DatePipe,
		private _generalService: GeneralService,
		private _notificationsService: NotificationsService,
	) {
		this.bsConfig.containerClass = `theme-dark-blue`;
		this.bsConfig.dateInputFormat = `YYYY-MM-DD`; // Or format like you want
		this.bsConfig.showClearButton = true; // Or format like you want
		this.bsConfig.adaptivePosition = true; // Or format like you want
		if (this.dateOverride !== null) {
			this.bsConfig.value = new Date(this.dateOverride);
		}

		this.hasBaseDropZoneOver = false;

		this.response = ``;
	}

	ngOnInit() {
		this.uploader.response.subscribe(pResult => {
			const _valid = this._generalService.validateResponse(pResult);
			if (_valid === `valid`) {
				this._notificationsService.success(pResult.message);
			} else {
				this._notificationsService.warn(pResult.message);
			}
			setTimeout(() => {
				this.submitted = false;
			}, 500);
		});
	}

	ngAfterViewInit() {
		this.uploader.onAfterAddingFile = (pFileItem => {
			pFileItem.withCredentials = false;
			const fileReader = new FileReader();
			fileReader.addEventListener(`load`, (fileReaderEvent) => {

				const fileExt = pFileItem._file.name.split(`.`).pop();
				const date = pFileItem._file.name.split(` _ `).shift();

				if (this.imageExtensions.includes(fileExt)) {
					exifr.parse(fileReader.result)
						.then(output => {
							if (output) {
								pFileItem.formData.fileMeta = output;
								if (output.DateTimeOriginal) {
									const date = this.datePipe.transform(output.DateTimeOriginal, `yyyy-MM-dd`);
									pFileItem.formData.year = date;
								}
							} else {
								pFileItem.formData.fileMeta = null;
							}
						});
				} else if (fileExt === 'pdf') {
					try {
						const _date = new Date(date);
						pFileItem.formData.fileMeta = {
							createdDate: date,
							lastModifiedDate: pFileItem._file.lastModified
						};
					}
					catch (err) { }
				}
				const fileHash = this._generalService.hashFile(fileReader.result);
				pFileItem.formData.fileHash = fileHash.toString();
				console.log(pFileItem.formData.fileHash);
			});
			fileReader.readAsBinaryString(pFileItem._file);
		});
		this.uploader.onBuildItemForm = (pFileItem: any, pForm: any) => {
			// pForm.append(`name`, pFileItem._file.name);
			// const _index = this.uploader.queue.indexOf(pFileItem);

			let fileExt = pFileItem._file.name.split(`.`).pop();
			fileExt = fileExt.toLowerCase();
			let _documentType = this.documentTypes[this.documentTypes.NONE];

			if (this.imageExtensions.includes(fileExt)) {
				_documentType = this.documentTypes[this.documentTypes.IMAGE];
			} else if (this.documentExtensions.includes(fileExt)) {
				_documentType = this.documentTypes[this.documentTypes.DOC];
			} else if (this.movieExtensions.includes(fileExt)) {
				_documentType = this.documentTypes[this.documentTypes.VIDEO];
			} else if (fileExt === 'pdf') {
				_documentType = this.documentTypes[this.documentTypes.PDF];
			} else if (fileExt === 'webm') {
				_documentType = this.documentTypes[this.documentTypes.WEBM];
			}

			let _date: any;
			if (this.dateOverride) {
				_date = this.dateOverride;
			} else {
				if (pFileItem.year) {
					_date = pFileItem.year;
				}
				else if (!pFileItem.year && pFileItem.formData.year) {
					_date = pFileItem.formData.year;
				}
				else {
					_date = null;
				}
			}

			pForm.append(`fileMeta`, JSON.stringify(pFileItem.formData.fileMeta));
			pForm.append(`fileHash`, pFileItem.formData.fileHash);
			pForm.append(`contentType`, pFileItem._file.type);
			pForm.append(`date`, this.datePipe.transform(new Date(), `yyyy-MM-dd`));
			pForm.append(`documentType`, _documentType);
			pForm.append(`entityId`, this.entityId);
			pForm.append(`fileSize`, pFileItem._file.size);
			pForm.append(`fileName`, pFileItem._file.name);
			pForm.append(`canceled`, 'false');
			pForm.append(`canceledDate`, '');
			pForm.append(`year`, (_date) ? this.datePipe.transform(new Date(_date), `yyyy-MM-dd`) : ``);
			return { pFileItem, pForm };
		};
	}

	fileOverBase(e: any): void {
		this.hasBaseDropZoneOver = e;
	}

	onFileDrop(pEvent) { }

	buildFormData(formData, data, parentKey?) {
		if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
			Object.keys(data).forEach(key => {
				this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
			});
		} else {
			const value = data == null ? '' : data;

			formData.append(parentKey, value);
		}
	}

	jsonToFormData(data) {
		const formData = new FormData();

		this.buildFormData(formData, data);

		return formData;
	}
}
