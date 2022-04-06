import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// components
import { DashboardComponent } from './views/dashboard/dashboard.component';

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
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
