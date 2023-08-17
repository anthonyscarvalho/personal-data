import { Component, OnInit } from '@angular/core';
// common
import { GeneralService } from '@common/services';
// modules
import { MenuModel } from '@menu/interfaces';

@Component({
	selector: 'acc-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

	menuItems: MenuModel[] = [
		{ name: `Bank Accounts`, url: `/bank-accounts`, order: 1, icon: `piggy-bank` },
		{ name: `Account Records`, url: `/account-records`, order: 2, icon: `dollar-sign` },
		{ name: `Budget`, url: `/budget`, order: 3, icon: `chart-area` },
		// import from legacy
		{ name: `Clients`, url: `/clients`, order: 1, icon: `user-circle` },
		{ name: `Contacts`, url: `/contacts`, order: 2, icon: `users` },
		{ name: `Products`, url: `/products`, order: 3, icon: `shopping-cart` },
		{ name: `Invoices`, url: `/invoices`, order: 4, icon: `file` },
		{ name: `Quotes`, url: `/quotations`, order: 5, icon: `file-alt` },
		{ name: `Google Ads`, url: `/campaigns`, order: 10, icon: `dollar-sign` },
		{ name: `Statements`, url: `/statements`, order: 6, icon: `file-alt` },
		{ name: `Logs`, url: `/logs`, order: 7, icon: `list-ol` },
		{ name: `Jobs`, url: `/jobs`, order: 8, icon: `id-card` },
		{ name: `Tickets`, url: `/tickets`, order: 9, icon: `ticket-alt` },
		{ name: `Scheduler`, url: `/scheduler`, order: 10, icon: `calendar-alt` },
		{ name: `Health`, url: `/health`, order: 11, icon: `heartbeat` },
		{ name: `Assets`, url: `/assets`, order: 12, icon: `folder` },
		{ name: `Files`, url: `/files`, order: 13, icon: `folder` },
	];
	adminMenu: MenuModel[] = [
		// import from legacy
		{ name: `Categories`, url: `/categories`, order: 1, icon: `check-square` },
		{ name: `Companies`, url: `/companies`, order: 2, icon: `building` },
		{ name: `Email Templates`, url: `/template-emails`, order: 6, icon: `envelope` },
		{ name: `PDF Templates`, url: `/template-attachments`, order: 4, icon: `paperclip` },
		{ name: `Quotation Templates`, url: `/template-quotations`, order: 7, icon: `file-alt` },
		{ name: `Settings`, url: `/settings`, order: 5, icon: `cogs` },
		{ name: `Users`, url: `/users`, order: 8, icon: `users` },
		{ name: `User Roles`, url: `/user_roles`, order: 9, icon: `user-secret` },
		// { name: `Bank Account Statements`, url: `/bank-account-statements`, order: 9, icon: `credit-card` },
		// { name: `Bank Accounts`, url: `/bank-accounts/accounts`, order: 3, icon: `building` },
	];

	reportMenuItems: MenuModel[] = [
		{ name: `Income`, url: `/reports/income`, order: 1, icon: `dollar-sign` },
		{ name: `Expenses`, url: `/reports/expenses`, order: 2, icon: `list` },
	];

	constructor(
		private _generalService: GeneralService,
	) {
		this._generalService.setTitle(`Dashboard`);
	}

	ngOnInit() { }
}
