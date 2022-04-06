import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';
// modules
import { BankAccountModel } from '@bankAccounts/interfaces';

@Component({
	selector: 'acc-filter-box',
	templateUrl: './filter-box.component.html',
	styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
	@Input() filterBoxConfig: IFilterBoxConfig;
	@Input() filterBoxOptions: IFilterBoxOptions;

	@Output() updater = new EventEmitter<any>();

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
	submitted = false;
	bankAccounts: BankAccountModel[];

	constructor(
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this.bsConfig.containerClass = `theme-dark-blue`;
		this.bsConfig.dateInputFormat = `YYYY-MM-DD`; // Or format like you want
	}

	ngOnInit() {
		if (this.filterBoxConfig.showBankAccounts) {
			this.loadBankAccounts();
		}
	}

	loadBankAccounts() {
		this._httpService.post('bank-accounts/viewAll', {}).then((results: any) => {
			if (results.status === `00`) {
				this.bankAccounts = results.data;
			}
		});
	}

	refreshRecords() {
		this.updater.emit(`load`);
	}

	addRecord() {
		this.updater.emit(`add`);
	}

	updateFilter() {
		this._generalService.setActiveFilter(this.filterBoxOptions.state);
		this.updater.emit(`changed`);
	}

	updateDir() {
		this._generalService.setActiveDir(this.filterBoxOptions.dir);
		this.updater.emit(`changed`);
	}

	updateRecords() {
		this._generalService.setRecords(this.filterBoxOptions.pagerRecords);
		this.updater.emit(`changed`);
	}

	updateDate() {
		this._generalService.setDate(this.filterBoxOptions.date);
		this.updater.emit(`changed`);
	}

	updateSearch() {
		if (this.filterBoxOptions.searchPhrase === ``) {
			this._generalService.setSearch(null);
		} else {
			this._generalService.setSearch(this.filterBoxOptions.searchPhrase);
		}
		this.updater.emit(`changed`);
	}

	updateBankAccount() {
		if (this.filterBoxOptions.bankAccount === ``) {
			this._generalService.setBankAccount(null);
		} else {
			this._generalService.setBankAccount(this.filterBoxOptions.bankAccount);
		}
		this.updater.emit(`changed`);
	}

	updateUser() {
		if (this.filterBoxOptions.user === `0`) {
			this._generalService.setUser(null);
		} else {
			this._generalService.setUser(this.filterBoxOptions.user);
		}
		this.updater.emit(`changed`);
	}

	resetSearch() {
		this._generalService.setSearch(null);
		this.filterBoxOptions.searchPhrase = this._generalService.getSearchPhrase();
		this.updater.emit(`changed`);
	}

	updateForm() {
		this.updater.emit(`save`);
	}
}
