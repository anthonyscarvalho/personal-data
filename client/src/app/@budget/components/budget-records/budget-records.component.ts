import { Component, OnInit, Input } from '@angular/core';

import { cAccountRecord } from '@sharedTypes/classes';
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';

@Component({
	selector: 'acc-budget-records',
	templateUrl: './budget-records.component.html',
	styleUrls: ['./budget-records.component.scss']
})
export class BudgetRecordsComponent implements OnInit {
	@Input() budgetId: string;
	@Input() keywords: string;

	public syncBudgetRecords = false;
	public allChecked = false;
	public budgetRecords: cAccountRecord[];
	public syncRecords: cAccountRecord[];
	public recordFilterBoxOptions: IFilterBoxOptions = new IFilterBoxOptions({
		bankAccount: this._generalService.getBankAccount(),
		searchPhrase: this._generalService.getSearchPhrase(),
		column: this._generalService.getSortColumn(),
		dir: this._generalService.getSortDir(),
		page: this._generalService.getPage(),
		pagerRecords: this._generalService.getRecords(),
	});

	constructor(
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService,
	) { }

	ngOnInit(): void {
		this.load();
	}

	addBreakdown() { }

	load() {
		this._httpService.post('bank-account-records/budget/' + this.budgetId, this.recordFilterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				this.budgetRecords = results.data;
				this.recordFilterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}

	recordFilterUpdater(pEvent: any) {
		if (typeof pEvent !== `object`) {
			switch (pEvent) {
				case `load`:
				case `changed`:
					this.load();
					break;
			}
		} else {
			switch (pEvent.action) {
				case `delete`:
					// this.delete(pEvent.record);
					break;
			}
		}
	}

	updateValue(pEvent, pModel) {
		this.syncBudgetRecords[pModel] = pEvent;
	}

	checkAll() {
		this.allChecked = true;
		this.syncRecords.forEach((record) => record.checked = true);
	}

	deleteBudgetRecord(pRecordId: string) {
		this._httpService.post('bank-account-records/remove-from-budget/', { recordId: pRecordId }).then((pResult: any) => {
			const _valid = this._generalService.validateResponse(pResult);
			if (_valid === 'valid') {
				this._notificationsService.success(pResult.message);
			} else {
				this._notificationsService.warn(pResult.message);
			}
			setTimeout(() => {
				this.load();
				this.syncBudgetRecords = false;
				this.allChecked = false;
			}, 500);
		});
	}

	showBudgetSync() {
		if (this.syncBudgetRecords) {
			this._httpService.post('bank-account-records/budget-search/', { keywords: this.keywords }).then((results: any) => {
				if (results.status === `00`) {
					this.syncRecords = results.data;
				}
			});
		}
	}

	saveRecords() {
		if (this.syncBudgetRecords) {
			const updatedRecords = this.syncRecords.filter((record) => record.checked === true).map((record) => record._id);

			this._httpService.post('bank-account-records/add-to-budget/', { records: updatedRecords, budgetId: this.budgetId }).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === 'valid') {
					this._notificationsService.success(pResult.message);
				} else {
					this._notificationsService.warn(pResult.message);
				}
				setTimeout(() => {
					this.load();
					this.syncBudgetRecords = false;
					this.allChecked = false;
				}, 500);
			});
		}
	}
}
