import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { CommonComponentsModule } from '../../components/common-components.module';
import { BankAccountRecordsModule } from '../bank-account-records/bank-account-records.module';

// Components
import { BaViewComponent } from './ba-view/ba-view.component';
import { BaAddComponent } from './ba-add/ba-add.component';
import { BaEditComponent } from './ba-edit/ba-edit.component';

const routes: Routes = [
	{
		path: 'bank-accounts', children: [
			{ path: '', component: BaViewComponent },
			{ path: 'add', component: BaAddComponent },
			{ path: 'edit/:id', component: BaEditComponent }
		]
	}
];

@NgModule({
	declarations: [
		BaViewComponent,
		BaAddComponent,
		BaEditComponent
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		FormsModule,
		ReactiveFormsModule,
		CommonComponentsModule,
		BankAccountRecordsModule
	],
	exports: [],
	entryComponents: [
		BaAddComponent
	]
})
export class BankAccountsModule { }
