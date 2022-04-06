import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// modules
import { ClientsRoutingModule } from './clients.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { ClientsDashboardComponent } from './views/clients-dashboard/clients-dashboard.component';
import { ClientsEditComponent } from './views/clients-edit/clients-edit.component';
import { ClientsViewComponent } from './views/clients-view/clients-view.component';

@NgModule({
	declarations: [
		ClientsDashboardComponent,
		ClientsEditComponent,
		ClientsViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ClientsRoutingModule,
		CommonComponentsModule,
	],
})
export class ClientsModule { }
