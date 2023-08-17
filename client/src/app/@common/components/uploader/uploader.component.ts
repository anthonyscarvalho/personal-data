import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

import exifr from 'exifr' // => exifr/dist/full.umd.cjs
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FileUploader } from 'ng2-file-upload'

import { eDocumentType } from '@common/enums';
import { GeneralService, HttpService, } from '@common/services';

@Component({
	selector: `acc-uploader`,
	templateUrl: `./uploader.component.html`,
	styleUrls: [`./uploader.component.scss`]
})
export class UploaderComponent implements OnInit, AfterViewInit {
	@Input() upload;
	@Input() entityId;
	@Input() dateOverride;
	@Output(`updater`) _updater = new EventEmitter<any>();

	@ViewChild(`filePicker`) _file: ElementRef;

	documentTypes = eDocumentType;

	imageExtensions: string[] = [`jpg`, `jpeg`, `png`, `gif`, `svg`, `webp`];
	documentExtensions: string[] = [`doc`, `docx`];
	movieExtensions: string[] = [`avi`, `mp4`, `mkv`, `webm`];

	uploader: FileUploader = new FileUploader({ url: environment.baseUrl + `/utilities/documentUpload`, itemAlias: `documentProcessor` });
	hasBaseDropZoneOver: boolean;
	response: string;

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

	constructor(
		private datePipe: DatePipe,
		private _generalService: GeneralService,
		private _httpService: HttpService,
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
		// this.uploader.response.subscribe(res => { this.response = res; this._updater.emit(JSON.parse(res)); });
	}

	ngAfterViewInit() {
		this.uploader.onAfterAddingFile = (pFileItem => {
			pFileItem.withCredentials = false;
			const fileReader = new FileReader();
			fileReader.addEventListener(`load`, (fileReaderEvent) => {

				let fileExt = pFileItem._file.name.split(`.`).pop();

				if (this.imageExtensions.includes(fileExt)) {
					exifr.parse(fileReader.result)
						.then(output => {
							if (output) {
								pFileItem.formData.imageMeta = output;
								if (output.DateTimeOriginal) {
									const date = this.datePipe.transform(output.DateTimeOriginal, `yyyy-MM-dd`);
									pFileItem.formData.year = date;
								}
							} else {
								pFileItem.formData.imageMeta = null;
							}
						});
				} else if (fileExt === 'pdf') {
					pFileItem.formData.fileMeta = pFileItem.file.rawFile;
				}
			});
			fileReader.readAsArrayBuffer(pFileItem._file);
		});
		this.uploader.onBuildItemForm = (pFileItem: any, pForm: any) => {
			// pForm.append(`name`, pFileItem._file.name);
			// const _index = this.uploader.queue.indexOf(pFileItem);

			let fileExt = pFileItem._file.name.split(`.`).pop();
			fileExt = fileExt.toLowerCase();
			let _documentType = this.documentTypes.none;

			if (this.imageExtensions.includes(fileExt)) {
				_documentType = this.documentTypes.image;
			} else if (this.documentExtensions.includes(fileExt)) {
				_documentType = this.documentTypes.doc;
			} else if (this.movieExtensions.includes(fileExt)) {
				_documentType = this.documentTypes.video;
			} else if (fileExt === 'pdf') {
				_documentType = this.documentTypes.pdf;
			} else if (fileExt === 'webm') {
				_documentType = this.documentTypes.webm;
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

			let _fileMeta: any = null;
			if (pFileItem.formData?.imageMeta) {
				_fileMeta = pFileItem.formData.imageMeta;
			} else if (pFileItem.formData?.fileMeta) {
				_fileMeta = pFileItem.formData.fileMeta;
			}

			pForm.append(`fileMeta`, _fileMeta);
			pForm.append(`contentType`, pFileItem._file.type);
			pForm.append(`date`, this.datePipe.transform(new Date(), `yyyy-MM-dd`));
			pForm.append(`documentType`, _documentType);
			pForm.append(`entityId`, this.entityId);
			pForm.append(`fileSize`, pFileItem._file.size);
			pForm.append(`name`, (pFileItem._file.name).toLowerCase());
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
