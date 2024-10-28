import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CommonComponentsModule } from '@common/common.module';

import { AccountRecordsEditComponent, AccountRecordsReportComponent, AccountRecordsViewComponent, AccountRecordsImportComponent } from '@accountRecords/components';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Account Records',
		url: 'account-records',
		order: 1,
		icon: 'coins',
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
			},
			{
				name: 'Import',
				url: 'import',
				order: 2,
				icon: 'plus',
			},
			{
				name: 'Report',
				url: 'report',
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
	declarations: [
		// components
		AccountRecordsEditComponent,
		AccountRecordsReportComponent,
		AccountRecordsViewComponent,
		AccountRecordsImportComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class AccountRecordsModule { }
