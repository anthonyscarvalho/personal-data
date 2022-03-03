import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Modules
import { CompaniesRoutingModule } from './companies.routing';
import { CommonComponentsModule } from '@common/common.module';
import { CompaniesDashboardComponent } from './components/companies-dashboard/companies-dashboard.component';
import { CompaniesEditComponent } from './components/companies-edit/companies-edit.component';

@NgModule({
	declarations: [
		CompaniesDashboardComponent,
		CompaniesEditComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		CompaniesRoutingModule,
		CommonComponentsModule,
	],
})
export class CompaniesModule { }
