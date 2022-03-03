import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// components
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { UsersEditComponent } from './components/users-edit/users-edit.component';
import { UsersViewComponent } from './components/users-view/users-view.component';

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
			{ path: '', component: UsersDashboardComponent },
			{ path: 'view', component: UsersViewComponent },
			{ path: 'add', component: UsersEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: UsersEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `users` }
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }
