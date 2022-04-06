import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: '', loadChildren: () => import('./@dashboard/dashboard.module').then(m => m.DashboardModule), },
	{ path: '', loadChildren: () => import('./@categories/categories.module').then(m => m.CategoriesModule), },
	{ path: '', loadChildren: () => import('./@clients/clients.module').then(m => m.ClientsModule), },
	{ path: '', loadChildren: () => import('./@companies/companies.module').then(m => m.CompaniesModule), },
	{ path: '', loadChildren: () => import('./@contacts/contacts.module').then(m => m.ContactsModule), },
	{ path: '', loadChildren: () => import('./@account-records/account-records.module').then(m => m.AccountRecordsModule), },
	{ path: '', loadChildren: () => import('./@bank-accounts/bank-accounts.module').then(m => m.BankAccountsModule), },
	{ path: '', loadChildren: () => import('./@budget/budget.module').then(m => m.BudgetModule), },
	{ path: '', loadChildren: () => import('./@journal-records/journal-records.module').then(m => m.JournalRecordsModule), },
	{ path: '', loadChildren: () => import('./@products/products.module').then(m => m.ProductsModule), },
	{ path: '', loadChildren: () => import('./@users/users.module').then(m => m.UsersModule), },
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
