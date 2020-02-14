import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MyDatePickerModule } from 'mydatepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastyModule } from 'ng2-toasty';

// Services
import { HttpService } from './services/http.service';
import { GeneralService } from './services/general.service';
import { NotificationsService } from './services/notifications.service';

// Components
import { AppComponent } from './app.component';
import { FilterBoxComponent } from './components/filter-box/filter-box.component';
import { NavigationComponent } from './components/navigation/navigation.component';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountsViewComponent } from './pages/accounts/accounts-view/accounts-view.component';
import { AccountsComponent } from './pages/accounts/accounts/accounts.component';
import { AccountRecordsComponent } from './pages/account-records/account-records/account-records.component';
import { AccountRecordsViewComponent } from './pages/account-records/account-records-view/account-records-view.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TableComponent } from './components/table/table.component';
import { JournalsComponent } from './pages/journals/journals/journals.component';
import { JournalsViewComponent } from './pages/journals/journals-view/journals-view.component';
import { AccountBlockComponent } from './pages/dashboard/account-block/account-block.component';
import { JournalBlockComponent } from './pages/dashboard/journal-block/journal-block.component';
import { JournalRecordsComponent } from './pages/journal-records/journal-records/journal-records.component';
import { JournalRecordsViewComponent } from './pages/journal-records/journal-records-view/journal-records-view.component';

@NgModule({
	declarations: [
		// components
		AppComponent,
		FilterBoxComponent,
		NavigationComponent,
		// pages
		AccountsViewComponent,
		AccountsComponent,
		DashboardComponent,
		AccountRecordsComponent,
		AccountRecordsViewComponent,
		HeaderComponent,
		FooterComponent,
		TableComponent,
		JournalsComponent,
		JournalsViewComponent,
		AccountBlockComponent,
		JournalBlockComponent,
		JournalRecordsComponent,
		JournalRecordsViewComponent,
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		// routing
		AppRoutingModule,
		// 3rd party scripts
		AngularFontAwesomeModule,
		BsDatepickerModule.forRoot(),
		ButtonsModule.forRoot(),
		ModalModule.forRoot(),
		MyDatePickerModule,
		PaginationModule.forRoot(),
		TabsModule.forRoot(),
		ToastyModule.forRoot(),
	],
	exports: [
		ToastyModule,
	],
	providers: [
		// services
		DatePipe,
		GeneralService,
		HttpService, ,
		NotificationsService,
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
