import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// interface
import { MegaMenuModel } from '@common/interfaces';
// services
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-side-menu',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
	@Input() menuItems: any;
	parentId: string;
	megaMenu: MegaMenuModel[];
	adminMenu = {
		label: `Admin`,
		options: [
			// { name: `Categories`, url: `/categories`, order: 1, icon: `check-square-o` },
			// { name: `Companies`, url: `/companies`, order: 2, icon: `building` },
			// { name: `PDF Templates`, url: `/template-attachments`, order: 4, icon: `paperclip` },
			{ name: `Settings`, url: `/settings`, order: 5, icon: `cogs` },
			// { name: `Email Templates`, url: `/template-emails`, order: 6, icon: `envelope` },
			// { name: `Quotation Templates`, url: `/template-quotations`, order: 7, icon: `file-text` },
			{ name: `Users`, url: `/users`, order: 8, icon: `users` },
			{ name: `User Roles`, url: `/user_roles`, order: 9, icon: `user-secret` }
		]
	};

	constructor(
		private route: ActivatedRoute
	) {
		if (this.route.snapshot.paramMap.get(`id`)) {
			this.parentId = this.route.snapshot.paramMap.get(`id`);
		} else {
			this.parentId = null;
		}

	}

	ngOnInit(): void {
		this.megaMenu = [
			{
				label: ``,
				options: [{
					name: `Home`,
					url: `/dashboard`,
					order: 1,
					icon: `home`,
				}]
			},

		]
		if (this.menuItems) {
			this.megaMenu.push(this.menuItems);
		}
		this.megaMenu.push(this.adminMenu);
	}
}
