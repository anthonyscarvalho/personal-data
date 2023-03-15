import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// external
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { IFilterBoxConfig, IFilterBoxOptions } from '@common/interfaces';
// modules

@Component({
	selector: 'acc-health-dashboard',
	templateUrl: './health-dashboard.component.html',
	styleUrls: ['./health-dashboard.component.scss']
})
export class HealthDashboardComponent implements OnInit {
	megaMenu: any;
	module: any;

	public filterBoxOptions: IFilterBoxOptions;
	public filterBoxConfig: IFilterBoxConfig = new IFilterBoxConfig({ showBankAccounts: false });

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

		this.filterBoxOptions = new IFilterBoxOptions();
		this.filterBoxOptions.state = this._generalService.getActiveFilter();
		this.filterBoxOptions.searchPhrase = this._generalService.getSearchPhrase();
		this.filterBoxOptions.column = this._generalService.getSortColumn();
		this.filterBoxOptions.dir = this._generalService.getSortDir();
		this.filterBoxOptions.page = this._generalService.getPage();
		this.filterBoxOptions.pagerRecords = this._generalService.getRecords();
	}

}
