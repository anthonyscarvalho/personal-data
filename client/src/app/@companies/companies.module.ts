import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// modules
import { CompaniesRoutingModule } from './companies.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { CompaniesDashboardComponent } from './views/companies-dashboard/companies-dashboard.component';
import { CompaniesEditComponent } from './views/companies-edit/companies-edit.component';
import { CompaniesViewComponent } from './views/companies-view/companies-view.component';

@NgModule({
	declarations: [
		CompaniesDashboardComponent,
		CompaniesEditComponent,
		CompaniesViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		CompaniesRoutingModule,
		CommonComponentsModule,
	],
})
export class CompaniesModule { }
