import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// components
import { CategoriesDashboardComponent } from './views/categories-dashboard/categories-dashboard.component';
import { CategoriesEditComponent } from './views/categories-edit/categories-edit.component';
import { CategoriesViewComponent } from './views/categories-view/categories-view.component';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Categories',
		url: '/categories',
		order: 1,
		icon: 'check-square',
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
		path: 'categories',
		children: [
			{ path: '', component: CategoriesDashboardComponent },
			{ path: 'view', component: CategoriesViewComponent },
			{ path: 'add', component: CategoriesEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: CategoriesEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `categories` }
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoriesRoutingModule { }
