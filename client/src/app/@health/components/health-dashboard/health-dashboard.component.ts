import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { cFilterBoxConfig, cFilterBoxOption } from '@sharedTypes/classes';
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-health-dashboard',
	templateUrl: './health-dashboard.component.html',
	styleUrls: ['./health-dashboard.component.scss']
})
export class HealthDashboardComponent implements OnInit {
	megaMenu: any;
	module: any;

	public filterBoxOptions: cFilterBoxOption;
	public filterBoxConfig: cFilterBoxConfig = new cFilterBoxConfig({ showBankAccounts: false });

	constructor(
		private route: ActivatedRoute,
		private _modalService: BsModalService,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationService: NotificationsService,
		// private _ClientsService: ClientsService,
	) {
		this._generalService.setTitle(`Clients: View All`);
	}

	ngOnInit(): void {
		this.megaMenu = this.route.snapshot.data.menu;

		this.filterBoxOptions = new cFilterBoxOption();
		this.filterBoxOptions.state = this._generalService.getActiveFilter();
		this.filterBoxOptions.searchPhrase = this._generalService.getSearchPhrase();
		this.filterBoxOptions.column = this._generalService.getSortColumn();
		this.filterBoxOptions.dir = this._generalService.getSortDir();
		this.filterBoxOptions.page = this._generalService.getPage();
		this.filterBoxOptions.pagerRecords = this._generalService.getRecords();
	}

}
