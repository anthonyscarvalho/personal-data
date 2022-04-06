import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// Components
import { BudgetDashComponent } from './views/budget-dash/budget-dash.component';
import { BudgetEditComponent } from './views/budget-edit/budget-edit.component';
import { BudgetViewComponent } from './views/budget-view/budget-view.component';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Budget',
		url: '/budget',
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
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BudgetRoutingModule { }
