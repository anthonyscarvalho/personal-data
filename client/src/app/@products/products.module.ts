import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Modules
import { ProductsRoutingModule } from './products.routing';
import { CommonComponentsModule } from '@common/common.module';
import { ProductsDashboardComponent } from './components/products-dashboard/products-dashboard.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';

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
