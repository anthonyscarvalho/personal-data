import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CommonComponentsModule } from '@common/common.module';

import { ProductsDashboardComponent, ProductsEditComponent, ProductsViewComponent } from '@products/components';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Products',
		url: 'products',
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
		path: 'products',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full' },
			{ path: 'view', component: ProductsViewComponent },
			{ path: 'add', component: ProductsEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: ProductsEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `products` }
	},
];

@NgModule({
	declarations: [
		ProductsDashboardComponent,
		ProductsEditComponent,
		ProductsViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class ProductsModule { }
