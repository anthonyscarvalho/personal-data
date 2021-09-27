import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// Global Components
import { GlobalViewComponent } from '@common/components';

// Components
import { BudgetDashComponent } from './components/budget-dash/budget-dash.component';
import { BudgetEditComponent } from './components/budget-edit/budget-edit.component';

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
			{ path: 'view', component: GlobalViewComponent },
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
