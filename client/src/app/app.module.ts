import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

// Services
import { GeneralService, HttpService, NotificationsService } from './@shared/services';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CommonComponentsModule } from './@common/common.module';

// Components
import { GlobalViewComponent } from './@shared/global-view/global-view.component';

@NgModule({
	declarations: [
		AppComponent,
		GlobalViewComponent,
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
		// Components
		GlobalViewComponent,
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
