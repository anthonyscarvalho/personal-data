import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	UsersDashboardComponent,
	UsersEditComponent,
	UsersViewComponent,
} from '@users/views';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Users',
		url: '/users',
		order: 1,
		icon: 'users',
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
		path: 'users',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full' },
			{ path: 'view', component: UsersViewComponent },
			{ path: 'add', component: UsersEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: UsersEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `users` }
	},
];

@NgModule({
	declarations: [
		UsersDashboardComponent,
		UsersEditComponent,
		UsersViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class UsersModule { }
