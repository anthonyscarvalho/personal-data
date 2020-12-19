import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './pages/menu/menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { JournalRecordsComponent } from './pages/journal-records/journal-records/journal-records.component';
import { JournalRecordsViewComponent } from './modules/journal-records/journal-records-view/journal-records-view.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'menu', component: MenuComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{
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
