import { Component, OnInit, Input } from '@angular/core';
// Interfaces
import { SubMenuInterface } from '../../interfaces/sub-menu';

@Component({
	selector: 'app-sub-menu',
	templateUrl: './sub-menu.component.html',
	styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
	@Input("menuItems") _menuItems: SubMenuInterface[];

	constructor() { }

	ngOnInit(): void {
	}

}
