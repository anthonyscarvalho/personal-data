import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	BudgetEditComponent,
	BudgetDashComponent,
	BudgetViewComponent,
} from '@budget/views';
import {
	BudgetRecordsComponent,
	BudgetDashBarComponent,
	BudgetDashIncomeComponent,
} from '@budget/components';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Budget',
		url: 'budget',
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
		path: 'budget',
		children: [
			{ path: '', component: BudgetDashComponent },
			{ path: 'view', component: BudgetViewComponent },
			{ path: 'add', component: BudgetEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: BudgetEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `budget` }
	},
];

@NgModule({
	declarations: [
		// components
		BudgetEditComponent,
		BudgetDashComponent,
		BudgetViewComponent,
		BudgetDashBarComponent,
		BudgetDashIncomeComponent,
		BudgetRecordsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class BudgetModule { }
