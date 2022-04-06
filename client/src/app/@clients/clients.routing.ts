import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// components
import { ClientsDashboardComponent } from './views/clients-dashboard/clients-dashboard.component';
import { ClientsEditComponent } from './views/clients-edit/clients-edit.component';
import { ClientsViewComponent } from './views/clients-view/clients-view.component';

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
			{ path: 'view', component: ClientsViewComponent },
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
