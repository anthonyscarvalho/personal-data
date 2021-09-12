import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// external
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
	selector: 'app-inputs',
	templateUrl: './inputs.component.html',
	styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
	@Input() inputValue;
	@Input() inputLabel;
	@Input() inputType;
	@Input() selectOptions;
	@Input() submitted;

	@Output('updater') _updater = new EventEmitter<any>();

	// public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

	bsConfig = {
		dateInputFormat: 'DD/MM/YYYY',
		containerClass: 'theme-dark-blue',
		showClearButton: true,
		clearPosition: 'right'
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
		this._updater.emit(pData);
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
}
