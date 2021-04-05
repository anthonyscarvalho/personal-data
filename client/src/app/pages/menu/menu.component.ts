import { Component, OnInit } from '@angular/core';

// interface
import { MenuInterface } from '../../interfaces/menu';
// services
import { GeneralService } from '../../services/general.service';
@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


	constructor(private generalService: GeneralService) {
		generalService.setTitle('Menu');
		// generalService.setSubNav(false);
		// generalService.setMainNav(true);
	}
	managementMenu: MenuInterface[] = [
		// { name: 'Clients', url: '/clients', order: 1, icon: 'user-circle' },
		// { name: 'Contacts', url: '/contacts', order: 2, icon: 'users' },
		// { name: 'Products', url: '/products', order: 3, icon: 'shopping-cart' },
		// { name: 'Invoices', url: '/invoices', order: 4, icon: 'file-o' },
		// { name: 'Quotations', url: '/quotations', order: 5, icon: 'file-text' },
		// { name: 'Statements', url: '/statements', order: 6, icon: 'file-text-o' },
		// { name: 'Logs', url: '/logs', order: 7, icon: 'list-ol' },
		// { name: 'Jobs', url: '/jobs', order: 8, icon: 'vcard' },
		// { name: 'Tickets', url: '/tickets', order: 9, icon: 'ticket' },
		// { name: 'Google Ads', url: '/campaigns', order: 10, icon: 'google' },
	];
	adminMenu: MenuInterface[] = [
		// { name: 'Categories', url: '/categories', order: 1, icon: 'check-square-o' },
		// { name: 'Companies', url: '/companies', order: 2, icon: 'building' },
		{ name: 'Bank Accounts', url: '/bank-accounts', order: 3, icon: 'building' },
		// { name: 'PDF Templates', url: '/template-attachments', order: 4, icon: 'paperclip' },
		{ name: 'Settings', url: '/settings', order: 5, icon: 'cogs' },
		// { name: 'Email Templates', url: '/template-emails', order: 6, icon: 'envelope' },
		// { name: 'Quotation Templates', url: '/template-quotations', order: 7, icon: 'file-text' },
		{ name: 'Users', url: '/users', order: 8, icon: 'users' },
		{ name: 'User Roles', url: '/user_roles', order: 9, icon: 'user-secret' },
		{ name: 'Bank Account Records', url: '/bank-account-records', order: 9, icon: 'credit-card' },
	];

	ngOnInit() {
	}
}
