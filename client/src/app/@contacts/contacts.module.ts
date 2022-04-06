import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { ContactsRoutingModule } from './contacts.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { ContactsViewComponent } from './views/contacts-view/contacts-view.component';
import { ContactsEditComponent } from './views/contacts-edit/contacts-edit.component';

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
