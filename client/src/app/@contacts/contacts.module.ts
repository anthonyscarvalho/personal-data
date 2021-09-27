import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ContactsRoutingModule } from './contacts.routing';
import { CommonComponentsModule } from '@common/common.module';
// Views
import { ContactsViewComponent } from './components/contacts-view/contacts-view.component';
import { ContactsEditComponent } from './components/contacts-edit/contacts-edit.component';

@NgModule({
	declarations: [
		ContactsViewComponent,
		ContactsEditComponent,
	],
	imports: [
		CommonModule,
		ContactsRoutingModule,
		CommonComponentsModule,
	]
})
export class ContactsModule { }
