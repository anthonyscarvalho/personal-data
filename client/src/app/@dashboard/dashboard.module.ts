import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { DashboardRoutingModule } from './dashboard.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { DashboardComponent } from './views/dashboard/dashboard.component';

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
