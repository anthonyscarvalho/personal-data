import { Component, Input, OnInit } from '@angular/core';
import { faBell, faCog, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Input() headerTitle: string;
	faBars = faBars;
	faCog = faCog;
	faBell = faBell;

	constructor() { }

	ngOnInit() {
	}

}
