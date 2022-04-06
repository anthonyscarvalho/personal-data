import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { JournalRoutingModule } from './journal.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { JournalViewComponent } from './views/journal-view/journal-view.component';

@NgModule({
	declarations: [
		JournalViewComponent
	],
	imports: [
		CommonModule,
		JournalRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		CommonComponentsModule
	],
	exports: [
		RouterModule
	],
})
export class JournalModule { }
