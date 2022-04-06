import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// modules
import { ProductsRoutingModule } from './products.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { ProductsDashboardComponent } from './views/products-dashboard/products-dashboard.component';
import { ProductsEditComponent } from './views/products-edit/products-edit.component';
import { ProductsViewComponent } from './views/products-view/products-view.component';

@NgModule({
	declarations: [
		ProductsDashboardComponent,
		ProductsEditComponent,
		ProductsViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ProductsRoutingModule,
		CommonComponentsModule,
	],
})
export class ProductsModule { }
