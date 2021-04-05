import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { CommonComponentsModule } from '../../components/common-components.module';

// Components
import { BarAddModalViewComponent } from './bar-add-modal/bar-add-modal.component';
import { BarViewComponent } from './bar-view/bar-view.component';
import { BarViewAccountComponent } from './bar-view-account/bar-view-account.component';

const routes: Routes = [
	{
		path: 'bank-account-records', children: [
			{ path: '', component: BarViewComponent },
			// { path: 'add', component: BankAccountsAddComponent },
			// { path: 'edit/:id', component: BankAccountsEditComponent }
		]
	}
];
@NgModule({
	declarations: [
		BarAddModalViewComponent,
		BarViewComponent,
		BarViewAccountComponent
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		FormsModule,
		ReactiveFormsModule,
		CommonComponentsModule
	],
	exports: [
		BarViewAccountComponent
	], entryComponents: [,
		BarAddModalViewComponent
	]
})
export class BankAccountRecordsModule { }
