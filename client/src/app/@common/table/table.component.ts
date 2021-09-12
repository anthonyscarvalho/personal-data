import { Component, Input, Output, EventEmitter, OnInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
// Services
import { GeneralService, HttpService, NotificationsService } from '@shared/services';

@Component({
	selector: 'acc-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewChecked {
	@Input() tableHead;
	@Input() tableBody;
	@Input() editModule;
	@Input() filterBoxOptions;
	@Input() showEdit = true;
	@Input() showStatus = true;
	@Input() showDelete = true;
	@Input() checkDuplicates = false;
	@Output() updater = new EventEmitter<any>();

	duplicateEntries: any[];
	totalPages: number;
	totalRecords: number;
	showingRecords: number;

	constructor(
		private _generalService: GeneralService
	) { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges) { }

	changeColumn(pNewColumn: string) {
		if (pNewColumn === this.filterBoxOptions.column) {
			if (this.filterBoxOptions.dir === `ASC`) {
				this._generalService.setActiveDir(`DESC`);
				this.filterBoxOptions.dir = `DESC`;
			} else {
				this._generalService.setActiveDir(`ASC`);
				this.filterBoxOptions.dir = `ASC`;
				this.filterBoxOptions.column = ``;
				pNewColumn = null;
			}
		} else {
			this.filterBoxOptions.dir = `ASC`;
			this._generalService.setActiveDir(`ASC`);
		}
		this.filterBoxOptions.column = pNewColumn;
		this._generalService.setActiveColumn(pNewColumn);
		this.updater.emit(`load`);
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

	updatePage(event: any) {
		this.filterBoxOptions.page = event.page;
		this._generalService.setPage(event.page);
		this.updater.emit(`load`);
	}

	getActiveColumn(currentColumn: string) {
		const activeColumn = this._generalService.getSortColumn();
		if (currentColumn === activeColumn) {
			return true;
		} else {
			return false;
		}
	}

	getCurrentPage() {
		return this.filterBoxOptions.page;
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

	checkValue(pInput) {
		if (pInput >= this.totalPages) {
			this.filterBoxOptions.page = this.totalPages;
		}
		this.updater.emit(`load`);
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
		}
	}

	enable(pId) {
		if (confirm(`Are you sure you want to enable this record?`)) {
			this.updater.emit({ action: `enable`, record: pId });
		}
	}

	cancel(pId) {
		if (confirm(`Are you sure you want to cancel this record?`)) {
			this.updater.emit({ action: `cancel`, record: pId });
		}
	}

	delete(pId) {
		if (confirm(`Are you sure you want to delete this record?`)) {
			this.updater.emit({ action: `delete`, record: pId });
		}
	}

	duplicateCheck(pRow) {
		if (!this.duplicateEntries) {
			const set = new Set();
			const _tmpArray = JSON.parse(JSON.stringify(this.tableBody));
			_tmpArray.map(x => {
				const _tmpRecord = JSON.parse(JSON.stringify(x))
				if (_tmpRecord._id != null || _tmpRecord._id !== undefined) {
					delete (_tmpRecord._id);
				}
				const str = JSON.stringify(_tmpRecord);
				if (!set.has(str)) {
					set.add(str);
				} else {
					if (!this.duplicateEntries) {
						this.duplicateEntries = [x];
					} else {
						this.duplicateEntries.push(x);
					}
				}
			});
			// console.log(this.duplicateEntries);
		}
		if (this.checkDuplicates && this.duplicateEntries) {
			const _filtered = this.duplicateEntries.filter(x => {
				const _record = JSON.stringify(x);
				if (_record === JSON.stringify(pRow)) {
					return x;
				}
			});
			if (_filtered.length > 0) {
				return `table-component__duplicate`;
			}
		}
		return ``;
	}

	ngAfterViewChecked() { }
}
