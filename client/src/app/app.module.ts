import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/landing/app.component';
import { AccountsViewComponent } from './pages/accounts/accounts-view/accounts-view.component';
import { AccountsEditComponent } from './pages/accounts/accounts-edit/accounts-edit.component';
import { AccountsAddComponent } from './pages/accounts/accounts-add/accounts-add.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountsViewComponent,
    AccountsEditComponent,
    AccountsAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
