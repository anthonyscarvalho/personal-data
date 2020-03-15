import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './pages/menu/menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// **Bank accounts
import { BankAccountsAddComponent } from './pages/bank-accounts/bank-accounts-add/bank-accounts-add.component';
import { BankAccountsViewComponent } from './pages/bank-accounts/bank-accounts-view/bank-accounts-view.component';
import { BankAccountsEditComponent } from './pages/bank-accounts/bank-accounts-edit/bank-accounts-edit.component';

import { JournalsComponent } from './pages/journals/journals/journals.component';
import { JournalsViewComponent } from './pages/journals/journals-view/journals-view.component';

import { JournalRecordsComponent } from './pages/journal-records/journal-records/journal-records.component';
import { JournalRecordsViewComponent } from './pages/journal-records/journal-records-view/journal-records-view.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'menu', component: MenuComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{
		path: 'bank-accounts', children: [
			{ path: '', component: BankAccountsViewComponent },
			{ path: 'add', component: BankAccountsAddComponent },
			{ path: 'edit/:id', component: BankAccountsEditComponent }
		]
	}, {
		path: 'journals', children: [
			{ path: '', component: JournalsViewComponent },
			{ path: 'add', component: JournalsComponent },
			{ path: 'edit/:id', component: JournalsComponent }
		]
	}, {
		path: 'journal-records', children: [
			{ path: '', component: JournalRecordsViewComponent },
			{ path: 'add', component: JournalRecordsComponent },
			{ path: 'edit/:id', component: JournalRecordsComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
