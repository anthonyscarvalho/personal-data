import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Modules
import { BudgetRoutingModule } from './budget.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { BudgetEditComponent } from './components/budget-edit/budget-edit.component';
import { BudgetDashComponent } from './components/budget-dash/budget-dash.component';

@NgModule({
	declarations: [
		// components
		BudgetEditComponent,
		BudgetDashComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		BudgetRoutingModule,
		CommonComponentsModule,
	],
})
export class BudgetModule { }
