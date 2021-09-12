import { Component, OnInit } from '@angular/core';
// services
import { GeneralService } from '@shared/services/general.service';
// interfaces
import { IMenu } from '@shared/interfaces';
@Component({
	selector: 'acc-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

	menuItems: IMenu[] = [
		{ name: `Bank Accounts`, url: `/bank-accounts`, order: 1, icon: `piggy-bank` },
		{ name: `Account Records`, url: `/account-records`, order: 2, icon: `dollar-sign` },
		{ name: `Contacts`, url: `/contacts`, order: 2, icon: `users` },
		// { name: `Clients`, url: `/clients`, order: 1, icon: `user-circle` },
		// { name: `Products`, url: `/products`, order: 3, icon: `shopping-cart` },
		// { name: `Invoices`, url: `/invoices`, order: 4, icon: `file-o` },
		// { name: `Quotations`, url: `/quotations`, order: 5, icon: `file-text` },
		// { name: `Statements`, url: `/statements`, order: 6, icon: `file-text-o` },
		// { name: `Logs`, url: `/logs`, order: 7, icon: `list-ol` },
		// { name: `Jobs`, url: `/jobs`, order: 8, icon: `vcard` },
		// { name: `Tickets`, url: `/tickets`, order: 9, icon: `ticket` },
		// { name: `Google Ads`, url: `/campaigns`, order: 10, icon: `google` },
	];
	adminMenu: IMenu[] = [
		// { name: `Categories`, url: `/categories`, order: 1, icon: `check-square-o` },
		// { name: `Companies`, url: `/companies`, order: 2, icon: `building` },
		// { name: `Bank Accounts`, url: `/bank-accounts/accounts`, order: 3, icon: `building` },
		// { name: `PDF Templates`, url: `/template-attachments`, order: 4, icon: `paperclip` },
		// { name: `Settings`, url: `/settings`, order: 5, icon: `cogs` },
		// { name: `Email Templates`, url: `/template-emails`, order: 6, icon: `envelope` },
		// { name: `Quotation Templates`, url: `/template-quotations`, order: 7, icon: `file-text` },
		// { name: `Users`, url: `/users`, order: 8, icon: `users` },
		// { name: `User Roles`, url: `/user_roles`, order: 9, icon: `user-secret` },
		// { name: `Bank Account Statements`, url: `/bank-account-statements`, order: 9, icon: `credit-card` },
	];

	reportMenuItems: IMenu[] = [
		// { name: `Income`, url: `/reports/income`, order: 1, icon: `dollar-sign` },
		// { name: `Expenses`, url: `/reports/expenses`, order: 2, icon: `list` },
		// { name: `Adwords`, url: `/reports/adwords`, order: 3, icon: `list` },
	];

	constructor(
		private _generalService: GeneralService,
	) {
		this._generalService.setTitle(`Dashboard`);
	}

	ngOnInit() { }
}
