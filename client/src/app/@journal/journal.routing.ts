import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// components
import { JournalViewComponent } from './views/journal-view/journal-view.component';

const routes: Routes = [
	{
		path: 'journals', children: [
			{ path: '', component: JournalViewComponent },
			{ path: 'view', component: JournalViewComponent },
			// { path: 'add', component: JournalsComponent },
			// { path: 'edit/:id', component: JournalsComponent }
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class JournalRoutingModule { }
