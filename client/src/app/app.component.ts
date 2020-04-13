import { Component, OnInit } from '@angular/core';
import { GeneralService } from './services/general.service';

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
