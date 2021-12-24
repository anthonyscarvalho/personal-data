import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// Global Components
import { GlobalViewComponent } from '@common/components';

// components
import { ClientsDashboardComponent } from './components/clients-dashboard/clients-dashboard.component';
import { ClientsEditComponent } from './components/clients-edit/clients-edit.component';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Clients',
		url: '/clients',
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
		path: 'clients',
		children: [
			{ path: '', component: ClientsDashboardComponent },
			{ path: 'view', component: GlobalViewComponent },
			{ path: 'add', component: ClientsEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: ClientsEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `clients` }
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientsRoutingModule { }
