import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
// external
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
	selector: 'acc-inputs',
	templateUrl: './inputs.component.html',
	styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
	@Input() inputValue;
	@Input() inputLabel;
	@Input() inputType;
	@Input() selectOptions;
	@Input() submitted;
	@Input() showLabel = true;
	@Input() selectMultiple = true;
	@Input() textAreaRows = 4;

	@Output(`updater`) _updater = new EventEmitter<any>();

	public readonly editor = ClassicEditor;
	public readonly config = {
		toolbar: {
			items: ["undo", "redo", "bold", "italic", "blockQuote", "ckfinder", "imageTextAlternative", "imageUpload", "heading", "imageStyle:full", "imageStyle:side", "link", "numberedList", "bulletedList", "mediaEmbed", "insertTable", "tableColumn", "tableRow", "mergeTableCells"],
			shouldNotGroupWhenFull: true
		},
		heading: {
			options: [
				{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
				{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
				{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
			]
		}
	};

	// public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

	bsConfig = {
		dateInputFormat: `DD/MM/YYYY`,
		containerClass: `theme-dark-blue`,
		showClearButton: true,
		clearPosition: `right`
	};

	bsConfigYear = {
		dateInputFormat: `YYYY`,
		containerClass: `theme-dark-blue`,
		showClearButton: true,
		clearPosition: `right`,
		startView: `year`,
		minMode: `year`
	};

	constructor() {
		this.bsConfig.containerClass = `theme-dark-blue`;
		this.bsConfig.dateInputFormat = `YYYY-MM-DD`; // Or format like you want
		// this.bsConfig.showClearButton = true;
	}

	ngOnInit(): void { }

	checkClass(fieldName) {
		if (fieldName !== `` && fieldName !== null && fieldName !== undefined) {
			if (fieldName.errors) {
				return `is-invalid`;
			} else {
				return `is-valid`;
			}
		}
	}

	pushChanges(pData) {
		let result;
		switch (this.inputType) {
			case `checkbox`:
				const element = pData as HTMLInputElement;
				result = (element.checked) ? true : false;
				break;
			default:
				result = pData
				break;
		}
		this._updater.emit(result);
	}

	pushDateChanges(pData) {
		this._updater.emit(this.convertDate(pData));
	}

	convertDate(pDate) {
		const _tmpDate = new Date(pDate);
		const _month = (_tmpDate.getMonth() + 1);
		const _day = _tmpDate.getDate();
		return _tmpDate.getFullYear() + `-` + ((_month < 10) ? `0` + _month : _month) + `-` + ((_day < 10) ? `0` + _day : _day);
	}

	getClass() {
		switch (this.inputType) {
			case 'files':
				return 'inputs__button';
			default:
				return 'inputs__standard';
		}
	}

	public onCKEChange({ editor }: ChangeEvent) {
		this._updater.emit(editor.getData());
	}
}
