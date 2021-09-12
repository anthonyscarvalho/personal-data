import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AppRoutingModule } from './contacts-routing.module';
import { CommonComponentsModule } from '../components/common-components.module';
// Views
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
	declarations: [ViewComponent, EditComponent],
	imports: [
		CommonModule,
		AppRoutingModule,
		CommonComponentsModule,
	]
})
export class contactsModule { }
