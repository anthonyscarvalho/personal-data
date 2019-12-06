import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Services
import { HttpService } from './services/http.service';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';

// Pages
import { AccountsViewComponent } from './pages/accounts/accounts-view/accounts-view.component';
import { AccountsEditComponent } from './pages/accounts/accounts-edit/accounts-edit.component';
import { AccountsAddComponent } from './pages/accounts/accounts-add/accounts-add.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    // components
    AppComponent,
    NavigationComponent,
    // pages
    AccountsViewComponent,
    AccountsEditComponent,
    AccountsAddComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
  ],
  providers: [
    // services
    HttpService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
