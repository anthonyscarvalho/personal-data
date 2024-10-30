import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-companies-dashboard',
	templateUrl: './companies-dashboard.component.html',
	styleUrls: ['./companies-dashboard.component.scss']
})
export class CompaniesDashboardComponent implements OnInit {
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit(): void { }
}
