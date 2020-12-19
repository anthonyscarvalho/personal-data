import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { CommonComponentsModule } from '../../components/common-components.module';

// Components
import { BankAccountsViewComponent } from './bank-accounts-view/bank-accounts-view.component';
import { BankAccountsAddComponent } from './bank-accounts-add/bank-accounts-add.component';
import { BankAccountsEditComponent } from './bank-accounts-edit/bank-accounts-edit.component';

const routes: Routes = [
	{
		path: 'bank-accounts', children: [
			{ path: '', component: BankAccountsViewComponent },
			{ path: 'add', component: BankAccountsAddComponent },
			{ path: 'edit/:id', component: BankAccountsEditComponent }
		]
	}
];

@NgModule({
	declarations: [
		BankAccountsViewComponent,
		BankAccountsAddComponent,
		BankAccountsEditComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		CommonComponentsModule
	],
	exports: [
		RouterModule
	],
	entryComponents: [
		BankAccountsAddComponent
	]
})
export class BankAccountsModule { }
