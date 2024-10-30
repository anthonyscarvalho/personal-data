import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { CommonComponentsModule } from '@common/common.module';
// components
import { JournalRecordsViewComponent } from './components/journal-records-view/journal-records-view.component';

const routes: Routes = [
	{
		path: 'journal-records', children: [
			{ path: '', component: JournalRecordsViewComponent },
			// { path: 'add', component: BankAccountsAddComponent },
			// { path: 'edit/:id', component: BankAccountsEditComponent }
		]
	}
];
@NgModule({
	declarations: [
		JournalRecordsViewComponent
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
})
export class JournalRecordsModule { }
