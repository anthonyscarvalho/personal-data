import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { cAccountRecord, cBudget } from '@sharedTypes/classes';
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';

@Component({
	selector: 'acc-account-records-view',
	templateUrl: './account-records-view.component.html',
	styleUrls: ['./account-records-view.component.scss']
})
export class AccountRecordsViewComponent implements AfterViewInit, OnInit {
	megaMenu: any;
	module: any;
	bsModalRef: BsModalRef;
	apiUrl: string;
	tableHead: any[];
	tableBody: cAccountRecord[];
	budgetItems: cBudget[];
	submitted: boolean = false;

	public filterBoxOptions: IFilterBoxOptions = new IFilterBoxOptions({
		bankAccount: this._generalService.getBankAccount(),
		searchPhrase: this._generalService.getSearchPhrase(),
		column: this._generalService.getSortColumn(),
		dir: this._generalService.getSortDir(),
		page: this._generalService.getPage(),
		pagerRecords: this._generalService.getRecords(),
	});
	public filterBoxConfig: IFilterBoxConfig = new IFilterBoxConfig({
		showStatusFilter: false
	});

	constructor(
		private ref: ChangeDetectorRef,
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		this._generalService.setTitle(`Bank Account Records: View All`);
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit() {
		this.load();
		this.loadBudgets();
	}

	filterUpdater(pEvent: any) {
		if (typeof pEvent !== `object`) {
			switch (pEvent) {
				case `load`:
				case `changed`:
					this.load();
					break;
			}
		} else {
			switch (pEvent.action) {
				case `enable`:
					this.status(pEvent.record, `false`);
					break;
				case `cancel`:
					this.status(pEvent.record, `true`);
					break;
				case `delete`:
					this.delete(pEvent.record);
					break;
			}
		}
	}

	getActiveColumn(currentColumn: string) {
		const activeColumn = this._generalService.getSortColumn();
		if (currentColumn === activeColumn) {
			return true;
		} else {
			return false;
		}
	}

	load() {
		this._httpService.post('bank-account-records/view', this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				// this.results = results.data;

				this.tableBody = results.data;
				this.filterBoxOptions.totalRecords = results.totalRecords;
			}
		});
	}



	fixSort() {
		this._httpService.post('bank-account-records/fix-order', this.filterBoxOptions).then((results: any) => {
			if (results.status === `00`) {
				this._notificationService.success(results.message);
				this.load();
			}
		});
	}

	showCalBalance(index: number) {
		const current = this.tableBody[index];
		let next = null;
		if (index < this.tableBody.length - 1) {
			next = this.tableBody[index + 1];
		}

		if (next) {

			const balance = current.credit + current.debit;
			const nextBalance = next.balance === null ? next.credit + next.debit : next.balance;
			return (nextBalance + balance).toFixed(2);
		} else {
			return (current.credit + current.debit).toFixed(2);
		}
	}

	updateRecord(row) {
		this.submitted = true;
		this._httpService.update(`bank-account-records/update`, row._id, row).then((pResult: any) => {
			const _valid = this._generalService.validateResponse(pResult);
			if (_valid === `valid`) {
				this._notificationService.success(pResult.message);
			} else {
				this._notificationService.warn(pResult.message);
			}
			setTimeout(() => {
				this.submitted = false;
			}, 500);
		});
	}

	status(pId, pAction) {
		this._httpService.update(`bank-account-records/status`, pId, { action: pAction }).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}

	delete(pId) {
		this._httpService.delete(`bank-account-records/delete`, pId).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}

	loadBudgets() {
		this._httpService.post('budget/viewAll', {}).then((results: any) => {
			if (results.status === `00`) {
				this.budgetItems = results.data.sort((a, b) => a.description.toLocaleLowerCase() < b.description.toLowerCase() ? -1 : 1);
			}
		});
	}

	ngAfterViewInit(): void {
		this.ref.detectChanges();
	}
}
