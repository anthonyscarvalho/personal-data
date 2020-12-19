import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { CommonComponentsModule } from '../../components/common-components.module';

// Compoenents
import { BankAccountsRecordsAddModalViewComponent } from './bank-accounts-records-add-modal/bank-accounts-records-add-modal.component';

const routes: Routes = [
	{
		path: 'bank-accounts', children: [
			{ path: '', component: BankAccountsRecordsAddModalViewComponent },
			// { path: 'add', component: BankAccountsAddComponent },
			// { path: 'edit/:id', component: BankAccountsEditComponent }
		]
	}
];
@NgModule({
	declarations: [
		BankAccountsRecordsAddModalViewComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		CommonComponentsModule
	],
	exports: [
		RouterModule,
		CommonComponentsModule
	], entryComponents: [
		BankAccountsRecordsAddModalViewComponent
	]
})
export class BankAccountRecordsModule { }
