import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { DashboardRoutingModule } from './dashboard.routing';
import { CommonComponentsModule } from '@common/common.module';
// Views
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
	declarations: [
		DashboardComponent,
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		CommonComponentsModule,
	],
})
export class DashboardModule { }
