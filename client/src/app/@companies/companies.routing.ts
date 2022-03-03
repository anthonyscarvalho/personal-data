import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// Global Components
import { GlobalViewComponent } from '@common/components';

// components
import { CompaniesDashboardComponent } from './components/companies-dashboard/companies-dashboard.component';
import { CompaniesEditComponent } from './components/companies-edit/companies-edit.component';

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
			{ path: 'view', component: GlobalViewComponent },
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
