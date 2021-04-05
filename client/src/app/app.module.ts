import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Services
import { GeneralService } from './services/general.service';
import { HttpService } from './services/http.service';
import { NotificationsService } from './services/notifications.service';

// Modules
import { CommonComponentsModule } from './components/common-components.module';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { BankAccountRecordsModule } from './modules/bank-account-records/bank-account-records.module';

import { JournalModule } from './modules/journal/journal.module';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { MenuComponent } from './pages/menu/menu.component';

import { AccountBlockComponent } from './pages/dashboard/account-block/account-block.component';
import { JournalBlockComponent } from './pages/dashboard/journal-block/journal-block.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'menu', component: MenuComponent },
	{ path: 'dashboard', component: DashboardComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		// pages
		DashboardComponent,
		MenuComponent,
		AccountBlockComponent,
		JournalBlockComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		// Modules
		CommonComponentsModule,
		BankAccountsModule,
		BankAccountRecordsModule,
		JournalModule,
		// routing
		RouterModule.forRoot(routes),
	],
	exports: [
		RouterModule,
		// Modules
		CommonComponentsModule,
		BankAccountsModule,
		BankAccountRecordsModule
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
