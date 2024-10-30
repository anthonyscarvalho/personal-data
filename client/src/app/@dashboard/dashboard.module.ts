import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	DashboardComponent,
} from '@dashboard/components';

const routes: Routes = [
	{
		path: 'dashboard',
		children: [
			{ path: '', component: DashboardComponent },
		],
		data: { module: `account-records` }
	}
];

@NgModule({
	declarations: [
		DashboardComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class DashboardModule { }
