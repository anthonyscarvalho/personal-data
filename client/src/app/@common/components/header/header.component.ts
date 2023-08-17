import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
// services
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	headerTitle = ``;

	@ViewChild(`settingsMenu`) _settingsMenu: ElementRef;

	constructor(
		private _generalService: GeneralService
	) { }

	ngOnInit() {
		this._generalService.getTitle().subscribe(pTitle => {
			this.headerTitle = pTitle;
		});
	}

	showSettingsMenu() {
		this._settingsMenu.nativeElement.classList.toggle('header__subNavigation--hidden');
	}
}
