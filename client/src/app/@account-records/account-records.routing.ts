import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// Components
import { AccountRecordsEditComponent } from './components/account-records-edit/account-records-edit.component';
import { AccountRecordsReportComponent } from './components/account-records-report/account-records-report.component';
import { AccountRecordsImportComponent } from './components/account-records-import/account-records-import.component';
import { AccountRecordsViewComponent } from './components/account-records-view/account-records-view.component';


const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Account Records',
		url: '/account-records',
		order: 1,
		icon: 'coins',
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
			},
			{
				name: 'Import',
				url: '/import',
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
		path: 'account-records',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full' },
			{ path: 'view', component: AccountRecordsViewComponent },
			{ path: 'add', component: AccountRecordsEditComponent, data: { add: true } },
			{ path: 'import', component: AccountRecordsImportComponent, data: { add: true } },
			{ path: 'edit/:id', component: AccountRecordsEditComponent, data: { add: false } },
			{ path: 'report', component: AccountRecordsReportComponent, data: {} },
		],
		data: { menu: megaMenu, module: `account-records` }
	}
];



@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AccountRecordsRoutingModule { }