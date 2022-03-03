import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Modules
import { BudgetRoutingModule } from './budget.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { BudgetDashBarComponent } from './components/_budget-dash-bar/budget-dash-bar.component';
import { BudgetEditComponent } from './components/budget-edit/budget-edit.component';
import { BudgetDashComponent } from './components/budget-dash/budget-dash.component';
import { BudgetViewComponent } from './components/budget-view/budget-view.component';

@NgModule({
	declarations: [
		// components
		BudgetEditComponent,
		BudgetDashComponent,
		BudgetViewComponent,
		BudgetDashBarComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		BudgetRoutingModule,
		CommonComponentsModule,
	],
})
export class BudgetModule { }
