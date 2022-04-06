import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-clients-dashboard',
	templateUrl: './clients-dashboard.component.html',
	styleUrls: ['./clients-dashboard.component.scss']
})
export class ClientsDashboardComponent implements OnInit {
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
