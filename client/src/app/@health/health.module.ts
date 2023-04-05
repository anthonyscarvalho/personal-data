import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	HealthDashboardComponent,
	HealthEditComponent,
	HealthImportComponent,
	HealthViewComponent,
} from '@health/views';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Health',
		url: 'health',
		order: 1,
		icon: 'heartbeat',
		children: [
			{
				name: 'View',
				url: 'view',
				order: 1,
				icon: 'eye',
			},
			{
				name: 'Add',
				url: 'add',
				order: 2,
				icon: 'plus',
			},
			{
				name: 'Import',
				url: 'import',
				order: 2,
				icon: 'file-import',
			}
		]
	}],
};

const routes: Routes = [
	{
		path: 'health',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full', },
			{ path: 'view', component: HealthViewComponent },
			{ path: 'add', component: HealthEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: HealthEditComponent, data: { add: false } },
			{ path: 'import', component: HealthImportComponent }
		],
		data: { menu: megaMenu, module: `health` }
	}
];

@NgModule({
	declarations: [
		HealthViewComponent,
		HealthEditComponent,
		HealthDashboardComponent,
		HealthImportComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class HealthModule { }
