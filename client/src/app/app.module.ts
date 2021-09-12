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
import { AppRoutingModule } from './app-routing.module';

import { CommonComponentsModule } from './components/common-components.module';

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
		AppRoutingModule,
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
