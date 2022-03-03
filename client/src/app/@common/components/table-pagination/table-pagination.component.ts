import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Services
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-table-pagination',
	templateUrl: './table-pagination.component.html',
	styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
	@Input() filterBoxOptions;
	@Output() updater = new EventEmitter<any>();
	totalPages: number;

	constructor(
		private _generalService: GeneralService
	) { }

	ngOnInit(): void { }

	checkValue(pInput) {
		if (pInput >= this.totalPages) {
			this.filterBoxOptions.page = this.totalPages;
		}
		this.updater.emit(`load`);
	}

	checkTotalPages() {
		if (this.filterBoxOptions.totalRecords && this.filterBoxOptions.totalRecords > 0) {
			this.totalPages = Math.ceil(this.filterBoxOptions.totalRecords / this.filterBoxOptions.pagerRecords);
			return true;
		} else {
			this.totalPages = 0;
			return false;
		}
	}

	handlePage(pType: string) {
		switch (pType) {
			case `next`:
				if (this.totalPages > 0 && this.filterBoxOptions.page < this.totalPages) {
					this.filterBoxOptions.page++;
					this._generalService.setPage(this.filterBoxOptions.page);
					this.updater.emit(`load`);
				}
				break;
			case `prev`:
				if (this.totalPages > 0 && this.filterBoxOptions.page > 1) {
					this.filterBoxOptions.page--;
					this._generalService.setPage(this.filterBoxOptions.page);
					this.updater.emit(`load`);
				}
				break;
			case `page`:
				this.updater.emit(`load`);
				break;
		}
	}

	botDisplayRecords() {
		if (this.filterBoxOptions.totalRecords < this.filterBoxOptions.pagerRecords) {
			return this.filterBoxOptions.totalRecords;
		} else {
			return ((this.filterBoxOptions.pagerRecords * this.filterBoxOptions.page) - (this.filterBoxOptions.pagerRecords - 1));
			if (this.filterBoxOptions.page < this.totalPages) {
			}
			else {
				const _lastFew = (this.filterBoxOptions.totalRecords - (this.filterBoxOptions.pagerRecords * (this.totalPages - 1)));
				return ((this.filterBoxOptions.pagerRecords * this.filterBoxOptions.page) - (this.filterBoxOptions.pagerRecords - 1))
			}
		}
	}

	topDisplayRecords() {
		if (this.filterBoxOptions.totalRecords < this.filterBoxOptions.pagerRecords) {
			return this.filterBoxOptions.totalRecords;
		} else {
			if (this.filterBoxOptions.page < this.totalPages) {
				return (this.filterBoxOptions.pagerRecords * this.filterBoxOptions.page)
			}
			else {

				const _lastFew = (this.filterBoxOptions.totalRecords - (this.filterBoxOptions.pagerRecords * (this.totalPages - 1)));
				return ((this.filterBoxOptions.pagerRecords * this.filterBoxOptions.page) - (this.filterBoxOptions.pagerRecords) + _lastFew)
			}
		}
	}

	totalDisplayRecords() {
		return this.filterBoxOptions.totalRecords;
	}

	getCurrentPage() {
		return this.filterBoxOptions.page;
	}

}
