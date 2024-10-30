import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	JournalViewComponent,
} from '@journal/components';

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
