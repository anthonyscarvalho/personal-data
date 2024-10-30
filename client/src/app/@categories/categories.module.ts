import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	CategoriesDashboardComponent,
	CategoriesEditComponent,
	CategoriesViewComponent,
} from '@categories/components';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Categories',
		url: 'categories',
		order: 1,
		icon: 'check-square',
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
		path: 'categories',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full' },
			{ path: 'view', component: CategoriesViewComponent },
			{ path: 'add', component: CategoriesEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: CategoriesEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `categories` }
	},
];

@NgModule({
	declarations: [
		CategoriesDashboardComponent,
		CategoriesEditComponent,
		CategoriesViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class CategoriesModule { }
