import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AccountsViewComponent } from './pages/accounts/accounts-view/accounts-view.component';
import { AccountsComponent } from './pages/accounts/accounts/accounts.component';

import { AccountRecordsViewComponent } from './pages/account-records/account-records-view/account-records-view.component';
import { AccountRecordsComponent } from './pages/account-records/account-records/account-records.component';

import { JournalsComponent } from './pages/journals/journals/journals.component';
import { JournalsViewComponent } from './pages/journals/journals-view/journals-view.component';

import { JournalRecordsComponent } from './pages/journal-records/journal-records/journal-records.component';
import { JournalRecordsViewComponent } from './pages/journal-records/journal-records-view/journal-records-view.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{
		path: 'accounts', children: [
			{ path: 'view', component: AccountsViewComponent },
			{ path: 'add', component: AccountsComponent },
			{ path: 'edit/:id', component: AccountsComponent }
		]
	},
	{
		path: 'account-records', children: [
			{ path: 'view', component: AccountRecordsViewComponent },
			{ path: 'add', component: AccountRecordsComponent },
			{ path: 'edit/:id', component: AccountRecordsComponent }
		]
	}, {
		path: 'journals', children: [
			{ path: 'view', component: JournalsViewComponent },
			{ path: 'add', component: JournalsComponent },
			{ path: 'edit/:id', component: JournalsComponent }
		]
	}, {
		path: 'journal-records', children: [
			{ path: 'view', component: JournalRecordsViewComponent },
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
