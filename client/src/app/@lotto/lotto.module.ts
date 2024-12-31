import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

import { CommonComponentsModule } from '@common/common.module';

import { LottoEditComponent, LottoViewComponent } from './components';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Lotto',
		url: 'lotto',
		order: 1,
		icon: 'dollar',
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
		path: 'lotto',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full', },
			{ path: 'view', component: LottoViewComponent },
			{ path: 'add', component: LottoEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: LottoEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `files` }
	},
];

@NgModule({
	declarations: [
		LottoEditComponent,
		LottoViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class LottoModule { }
