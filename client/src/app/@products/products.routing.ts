import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// components
import { ProductsDashboardComponent } from './views/products-dashboard/products-dashboard.component';
import { ProductsEditComponent } from './views/products-edit/products-edit.component';
import { ProductsViewComponent } from './views/products-view/products-view.component';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Products',
		url: '/products',
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
		path: 'products',
		children: [
			{ path: '', redirectTo: 'view' },
			{ path: 'view', component: ProductsViewComponent },
			{ path: 'add', component: ProductsEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: ProductsEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `products` }
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductsRoutingModule { }
