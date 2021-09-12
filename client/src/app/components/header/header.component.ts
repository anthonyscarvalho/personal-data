import { Component, Input, OnInit } from '@angular/core';
// services
import { GeneralService } from '../../services/general.service';

@Component({
	selector: 'app-header',
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
