import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// module
import { CommonComponentsModule } from '@common/common.module';
import {
	BankAccountsDashComponent,
	BankAccountsEditComponent,
	BankAccountsViewComponent,
	BankAccountsDashBlockComponent,
} from '@bankAccounts/components';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Bank Accounts',
		url: 'bank-accounts',
		order: 1,
		icon: 'piggy-bank',
		children: [
			{
				name: 'View',
				url: 'view',
				order: 1,
				icon: 'eye',
			},
			{
				name: 'Add',
				url: 'add',
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
			{ path: 'view', component: BankAccountsViewComponent },
			{ path: 'add', component: BankAccountsEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: BankAccountsEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `bank-accounts` }
	},
];

@NgModule({
	declarations: [
		// components
		BankAccountsDashBlockComponent,
		BankAccountsDashComponent,
		BankAccountsEditComponent,
		BankAccountsViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class BankAccountsModule { }
