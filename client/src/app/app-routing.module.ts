import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', loadChildren: () => import('./@dashboard/dashboard.module').then(m => m.dashboardModule), },
	{ path: 'contacts', loadChildren: () => import('./@contacts/contacts.module').then(m => m.contactsModule), },
	{ path: 'bank-accounts', loadChildren: () => import('./@bank-accounts/bank-accounts.module').then(m => m.bankAccountsModule), }
];

const config: ExtraOptions = {
	useHash: false,
	relativeLinkResolution: 'corrected',
};

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
