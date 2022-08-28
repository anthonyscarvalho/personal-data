import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// common
import { CommonComponentsModule } from '@common/common.module';
// module
import {
	ContactsViewComponent,
	ContactsEditComponent,
} from '@contacts/views';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Contacts',
		url: '/contacts',
		order: 1,
		icon: 'address-book',
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
	}],
};

const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', redirectTo: 'view', pathMatch: 'full', },
			{ path: 'view', component: ContactsViewComponent },
			{ path: 'add', component: ContactsEditComponent },
			{ path: 'edit/:id', component: ContactsEditComponent }
		],
		data: { menu: megaMenu }
	}
];

@NgModule({
	declarations: [
		ContactsViewComponent,
		ContactsEditComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class ContactsModule { }
