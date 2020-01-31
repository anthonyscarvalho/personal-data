import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
	selector: 'app-filter-box',
	templateUrl: './filter-box.component.html',
	styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
	@Input() filterBoxConfig;
	@Input() filterBoxOptions;

	@Output('updater') _updater = new EventEmitter<any>();

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

	constructor(
		private _generalService: GeneralService,
	) {
		this.bsConfig.containerClass = 'theme-dark-blue';
		this.bsConfig.dateInputFormat = 'YYYY-MM-DD'; // Or format like you want
	}

	ngOnInit() {
		this._generalService.setDate(this.filterBoxOptions.date);
		this.filterBoxOptions.state = this._generalService.getActiveFilter();
		this.filterBoxOptions.invoiceFilter = this._generalService.getInvFilter();
		this.filterBoxOptions.dir = this._generalService.getSortDir();
		this.filterBoxOptions.user = this._generalService.getUser();
		this.filterBoxOptions.searchPhrase = this._generalService.getSearchPhrase();
		this.filterBoxOptions.pagerRecords = this._generalService.getRecords();
		this.filterBoxOptions.page = this._generalService.getPage();
	}

	refreshRecords() {
		this._updater.emit('load');
	}

	addRecord() {
		this._updater.emit('add');
	}

	updateFilter() {
		this._generalService.setActiveFilter(this.filterBoxOptions.state);
		this._updater.emit('changed');
	}
	updateInvFilter() {
		this._generalService.setInvFilter(this.filterBoxOptions.invoiceFilter);
		this._updater.emit('changed');
	}
	updateDir() {
		this._generalService.setActiveDir(this.filterBoxOptions.dir);
		this._updater.emit('changed');
	}
	updateRecords() {
		this._generalService.setRecords(this.filterBoxOptions.pagerRecords);
		this._updater.emit('changed');
	}
	updateDate() {
		this._generalService.setDate(this.filterBoxOptions.date);
		this._updater.emit('changed');
	}
	updateSearch() {
		if (this.filterBoxOptions.searchPhrase === '') {
			this._generalService.setSearch(null);
		} else {
			this._generalService.setSearch(this.filterBoxOptions.searchPhrase);
		}
		this._updater.emit('changed');
	}
	updateUser() {
		if (this.filterBoxOptions.user === '0') {
			this._generalService.setUser(null);
		} else {
			this._generalService.setUser(this.filterBoxOptions.user);
		}
		this._updater.emit('changed');
	}
	resetSearch() {
		this._generalService.setSearch('');
		this.filterBoxOptions.searchPhrase = this._generalService.getSearchPhrase();
		this._updater.emit('changed');
	}
	updateForm() {
		this._updater.emit('save');
	}

}
