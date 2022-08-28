import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// common
import { GeneralService, HttpService, NotificationsService } from './@common/services';
import { CommonComponentsModule } from './@common/common.module';

// module
import { AppComponent } from './app.component';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: '', loadChildren: () => import('./@account-records/account-records.module').then(m => m.AccountRecordsModule), },
	{ path: '', loadChildren: () => import('./@bank-accounts/bank-accounts.module').then(m => m.BankAccountsModule), },
	{ path: '', loadChildren: () => import('./@budget/budget.module').then(m => m.BudgetModule), },
	{ path: '', loadChildren: () => import('./@categories/categories.module').then(m => m.CategoriesModule), },
	{ path: '', loadChildren: () => import('./@clients/clients.module').then(m => m.ClientsModule), },
	{ path: '', loadChildren: () => import('./@companies/companies.module').then(m => m.CompaniesModule), },
	{ path: '', loadChildren: () => import('./@contacts/contacts.module').then(m => m.ContactsModule), },
	{ path: '', loadChildren: () => import('./@dashboard/dashboard.module').then(m => m.DashboardModule), },
	{ path: '', loadChildren: () => import('./@journal-records/journal-records.module').then(m => m.JournalRecordsModule), },
	{ path: '', loadChildren: () => import('./@menu/menu.module').then(m => m.MenuModule), },
	{ path: '', loadChildren: () => import('./@products/products.module').then(m => m.ProductsModule), },
	{ path: '', loadChildren: () => import('./@users/users.module').then(m => m.UsersModule), },
];

const config: ExtraOptions = {
	useHash: false,
	relativeLinkResolution: 'corrected',
};

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		// Modules
		RouterModule.forRoot(routes, config),
		CommonComponentsModule,
	],
	exports: [
		RouterModule,
		// Modules
		CommonComponentsModule,
	],
	providers: [
		// services
		DatePipe,
		GeneralService,
		HttpService,
		NotificationsService,
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
