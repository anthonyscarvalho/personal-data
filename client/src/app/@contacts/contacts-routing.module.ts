import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// Components
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Contacts',
		url: '/contacts',
		order: 1,
		icon: 'address-book',
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
	}],
};

const routes: Routes = [
	{
		path: '',
		children: [{
			path: '',
			redirectTo: 'view',
			pathMatch: 'full',
		}, {
			path: 'view',
			component: ViewComponent
		}, {
			path: 'add',
			component: EditComponent
		}, {
			path: 'edit/:id',
			component: EditComponent
		}],
		data: { menu: megaMenu }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
