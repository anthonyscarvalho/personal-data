import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// Components
import { BaDashComponent } from './ba-accounts/dash/dash.component';
import { BaEditComponent } from './ba-accounts/edit/edit.component';
import { BaViewComponent } from './ba-accounts/view/view.component';
import { BarViewComponent } from './ba-records/bar-view/bar-view.component';
import { BarEditComponent } from './ba-records/edit/edit.component';
import { BarReportComponent } from './ba-records/report/report.component';


const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Accounts',
		url: '/bank-accounts/accounts',
		order: 1,
		icon: 'piggy-bank',
		children: [
			{
				name: 'Accounts',
				url: '/view',
				order: 1,
				icon: 'eye',
			},
			{
				name: 'Account',
				url: '/add',
				order: 2,
				icon: 'plus',
			}
		]
	}, {
		name: 'Account Records',
		url: '/bank-accounts/records',
		order: 1,
		icon: 'coins',
		children: [
			{
				name: 'Records',
				url: '/view',
				order: 1,
				icon: 'eye',
			},
			{
				name: 'Records',
				url: '/add',
				order: 2,
				icon: 'plus',
			},
			{
				name: 'Report',
				url: '/report',
				order: 3,
				icon: 'chart-area',
			}
		]
	},],
};

const routes: Routes = [
	{
		path: 'accounts',
		children: [
			{ path: '', component: BaDashComponent },
			{ path: 'view', component: BaViewComponent },
			{ path: 'add', component: BaEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: BaEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu }
	},
	{
		path: 'records',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full' },
			{ path: 'view', component: BarViewComponent },
			{ path: 'add', component: BarEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: BarEditComponent, data: { add: false } },
			{ path: 'report', component: BarReportComponent, data: {} },
		],
		data: { menu: megaMenu }
	}
];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
