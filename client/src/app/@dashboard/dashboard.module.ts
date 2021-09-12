import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AppRoutingModule } from './dashboard-routing.module';
import { CommonComponentsModule } from '../components/common-components.module';
// Views
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	declarations: [
		DashboardComponent,
	],
	imports: [
		CommonModule,
		AppRoutingModule,
		CommonComponentsModule,
	],
})
export class dashboardModule { }
