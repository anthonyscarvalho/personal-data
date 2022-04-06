import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-users-dashboard',
	templateUrl: './users-dashboard.component.html',
	styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent implements OnInit {
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
