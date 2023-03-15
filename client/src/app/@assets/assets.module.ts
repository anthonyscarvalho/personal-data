import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// common
import { CommonComponentsModule } from '@common/common.module';
// module
import { AssetsDashComponent, AssetsEditComponent, AssetsViewComponent } from '@assets/views';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Assets',
		url: 'assets',
		order: 1,
		icon: 'car',
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
	}],
};

const routes: Routes = [
	{
		path: 'assets',
		children: [
			{ path: '', component: AssetsDashComponent },
			{ path: 'view', component: AssetsViewComponent },
			{ path: 'add', component: AssetsEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: AssetsEditComponent, data: { add: false } }
		],
		data: { menu: megaMenu, module: `assets` }
	}
];

@NgModule({
	declarations: [
		AssetsViewComponent,
		AssetsEditComponent,
		AssetsDashComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class AssetsModule { }
