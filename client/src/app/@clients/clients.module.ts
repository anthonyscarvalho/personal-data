import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Modules
import { ClientsRoutingModule } from './clients.routing';
import { CommonComponentsModule } from '@common/common.module';
import { ClientsDashboardComponent } from './components/clients-dashboard/clients-dashboard.component';
import { ClientsEditComponent } from './components/clients-edit/clients-edit.component';

@NgModule({
	declarations: [
		ClientsDashboardComponent,
		ClientsEditComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ClientsRoutingModule,
		CommonComponentsModule,
	],
})
export class ClientsModule { }
