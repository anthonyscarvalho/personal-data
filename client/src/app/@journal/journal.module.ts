import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { JournalModule } from './journal/journal.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		JournalModule,
	],
	exports: [
		JournalModule,
	]
})
export class journalModule { }
