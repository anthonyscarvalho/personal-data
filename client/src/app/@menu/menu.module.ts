import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CommonComponentsModule } from '@common/common.module';

import { MenuComponent } from '@menu/components';

const routes: Routes = [
	{
		path: 'menu',
		children: [
			{ path: '', component: MenuComponent },
		],
		data: { module: `menu` }
	}
];

@NgModule({
	declarations: [
		MenuComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class MenuModule { }
