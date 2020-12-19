import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { CommonComponentsModule } from '../../components/common-components.module';

// Components
import { JournalViewComponent } from './journal-view/journal-view.component';

const routes: Routes = [
	{
		path: 'journal', children: [
			{ path: '', component: JournalViewComponent },
			// { path: 'add', component: JournalsComponent },
			// { path: 'edit/:id', component: JournalsComponent }
		]
	},
];

@NgModule({
	declarations: [
		JournalViewComponent
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
export class JournalModule { }
