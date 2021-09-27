import { Component, OnInit, Input } from '@angular/core';
// Interfaces
import { ISubMenu } from '@common/interfaces';

@Component({
	selector: 'acc-sub-menu',
	templateUrl: './sub-menu.component.html',
	styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
	@Input() menuItems: ISubMenu[];

	constructor() { }

	ngOnInit(): void { }
}
