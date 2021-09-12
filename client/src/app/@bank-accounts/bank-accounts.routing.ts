import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// Global Components
import { GlobalViewComponent } from '@shared/global-view/global-view.component';

// Components
import { BankAccountsDashComponent } from './bank-accounts-dash/bank-accounts-dash.component';
import { BankAccountsEditComponent } from './bank-accounts-edit/bank-accounts-edit.component';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Bank Accounts',
		url: '/bank-accounts',
		order: 1,
		icon: 'piggy-bank',
		children: [
			{
				name: 'View',
				url: '/view',
				order: 1,
				icon: 'eye',
			},
			{
				name: 'Add',
				url: '/add',
				order: 2,
				icon: 'plus',
			}
		]
	},],
};

const routes: Routes = [
	{
		path: 'bank-accounts',
		children: [
			{ path: '', component: BankAccountsDashComponent },
			{ path: 'view', component: GlobalViewComponent },
			{ path: 'add', component: BankAccountsEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: BankAccountsEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `bank-accounts` }
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BankAccountsRoutingModule { }
