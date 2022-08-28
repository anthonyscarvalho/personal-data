import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	MenuComponent,
} from '@menu/views';

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
