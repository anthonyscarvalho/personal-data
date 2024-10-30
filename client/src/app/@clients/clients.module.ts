import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CommonComponentsModule } from '@common/common.module';

import { ClientsDashboardComponent, ClientsEditComponent, ClientsViewComponent } from '@clients/components';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Clients',
		url: 'clients',
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
	declarations: [
		ClientsDashboardComponent,
		ClientsEditComponent,
		ClientsViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class ClientsModule { }
