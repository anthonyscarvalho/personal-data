import { Component, OnInit, Input } from '@angular/core';
// Interfaces
import { ISubMenu, MegaMenuModel } from '@common/interfaces';

@Component({
	selector: 'acc-sub-menu',
	templateUrl: './sub-menu.component.html',
	styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
	@Input() menuItems: any;

	megaMenu: ISubMenu[];

	constructor() { }

	ngOnInit(): void {
		this.megaMenu = [
			{
				name: `Menu`,
				url: `/menu`,
			},

		]
		if (this.menuItems) {
			this.menuItems.options.forEach(menuOption => {
				this.megaMenu.push({
					name: menuOption.name,
					url: `/${menuOption.url}`,
				});
				menuOption.children.forEach(child => {
					this.megaMenu.push({
						name: `${menuOption.name} ${child.name}`,
						url: `/${menuOption.url}/${child.url}`,
					});
				});
			});
			// this.megaMenu.push(this.menuItems);
		}
	}
}
