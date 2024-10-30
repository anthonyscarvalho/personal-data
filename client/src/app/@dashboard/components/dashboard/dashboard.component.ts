import { Component, OnInit } from '@angular/core';
// common
import { GeneralService } from '@common/services';

@Component({
	selector: 'acc-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

	constructor(
		private _generalService: GeneralService,
	) {
		this._generalService.setTitle(`Dashboard`);
	}

	ngOnInit() { }
}
