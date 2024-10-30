import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { cBankAccount, cBankAccountNumber, cBankAccountDashboard, cCategory, cFilterBoxConfig, cFilterBoxOption } from '@sharedTypes/classes';
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-bank-accounts-view',
	templateUrl: './bank-accounts-view.component.html',
	styleUrls: ['./bank-accounts-view.component.scss']
})
export class BankAccountsViewComponent implements OnInit {
	megaMenu: any;
	module: any;
	bsModalRef: BsModalRef;
	apiUrl: string;
	tableHead: any[];
	tableBody: any[];
	// results: IBankAccount[];
	public filterBoxOptions: cFilterBoxOption = new cFilterBoxOption({
		state: this._generalService.getActiveFilter(),
		searchPhrase: this._generalService.getSearchPhrase(),
		column: this._generalService.getSortColumn(),
		dir: this._generalService.getSortDir(),
		page: this._generalService.getPage(),
		pagerRecords: this._generalService.getRecords(),
	});
	public filterBoxConfig: cFilterBoxConfig = new cFilterBoxConfig({ showBankAccounts: false });

	constructor(
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService
	) {
		this._generalService.setTitle(`Bank Accounts: View All`);
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit() {
		this.load();
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

	load() {
		this._httpService.post('bank-accounts/view', this.filterBoxOptions).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				// this.results = pResults.data;
				this.tableBody = pResults.data;
				this.filterBoxOptions.totalRecords = pResults.totalRecords;
			}
		});
	}

	status(pId, pAction) {
		this._httpService.update(`bank-accounts/status`, pId, { action: pAction }).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}

	delete(pId) {
		this._httpService.delete(`bank-accounts/delete`, pId).then((results: any) => {
			if (results.status === `00`) {
				this.load();
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}
}
