import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	CompaniesDashboardComponent,
	CompaniesEditComponent,
	CompaniesViewComponent,
} from '@companies/components';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'companies',
		url: 'companies',
		order: 1,
		icon: 'chart-area',
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
			}
		]
	},],
};

const routes: Routes = [
	{
		path: 'companies',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full' },
			{ path: 'view', component: CompaniesViewComponent },
			{ path: 'add', component: CompaniesEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: CompaniesEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `companies` }
	},
];

@NgModule({
	declarations: [
		CompaniesDashboardComponent,
		CompaniesEditComponent,
		CompaniesViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class CompaniesModule { }
