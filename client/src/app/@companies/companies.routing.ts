import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';
// components
import { CompaniesDashboardComponent } from './views/companies-dashboard/companies-dashboard.component';
import { CompaniesEditComponent } from './views/companies-edit/companies-edit.component';
import { CompaniesViewComponent } from './views/companies-view/companies-view.component';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'companies',
		url: '/companies',
		order: 1,
		icon: 'chart-area',
		children: [
			{
				name: 'View',
				url: '/view',
				order: 1,
				icon: 'eye',
			},
			{
				name: 'Add',
				url: '/add',
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
			{ path: '', component: CompaniesDashboardComponent },
			{ path: 'view', component: CompaniesViewComponent },
			{ path: 'add', component: CompaniesEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: CompaniesEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `companies` }
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CompaniesRoutingModule { }
