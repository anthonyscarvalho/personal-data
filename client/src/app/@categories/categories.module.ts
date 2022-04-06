import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// modules
import { CategoriesRoutingModule } from './categories.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { CategoriesDashboardComponent } from './views/categories-dashboard/categories-dashboard.component';
import { CategoriesEditComponent } from './views/categories-edit/categories-edit.component';
import { CategoriesViewComponent } from './views/categories-view/categories-view.component';

@NgModule({
	declarations: [
		CategoriesDashboardComponent,
		CategoriesEditComponent,
		CategoriesViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		CategoriesRoutingModule,
		CommonComponentsModule,
	],
})
export class CategoriesModule { }
