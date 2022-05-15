import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Modules
import { BudgetRoutingModule } from './budget.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { BudgetDashBarComponent } from './components/budget-dash-bar/budget-dash-bar.component';
// views
import { BudgetEditComponent } from './views/budget-edit/budget-edit.component';
import { BudgetDashComponent } from './views/budget-dash/budget-dash.component';
import { BudgetViewComponent } from './views/budget-view/budget-view.component';
import { BudgetRecordsComponent } from './components/budget-records/budget-records.component';

@NgModule({
	declarations: [
		// components
		BudgetEditComponent,
		BudgetDashComponent,
		BudgetViewComponent,
		BudgetDashBarComponent,
		BudgetRecordsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		BudgetRoutingModule,
		CommonComponentsModule,
	],
})
export class BudgetModule { }
