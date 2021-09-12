import { Component, Input, OnInit } from '@angular/core';
// services
import { GeneralService, HttpService, NotificationsService } from '@shared/services';

@Component({
	selector: 'acc-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	headerTitle = ``;

	constructor(
		private _generalService: GeneralService
	) { }

	ngOnInit() {
		this._generalService.getTitle().subscribe(pTitle => {
			this.headerTitle = pTitle;
		});
	}
}
