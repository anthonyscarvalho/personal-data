import { Component, OnInit } from '@angular/core';
// services
import { GeneralService } from './@common/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	appTitle;

	constructor(
		private _generalService: GeneralService
	) { }

	ngOnInit() {
		this._generalService.getTitle().subscribe(pTitle => {
			this.appTitle = pTitle;
		});
	}
}
