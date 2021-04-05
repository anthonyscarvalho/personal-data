import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MyDatePickerModule } from 'mydatepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastyModule } from 'ng2-toasty';

// Components
import { ErrorsComponent } from './errors/errors.component';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { TableComponent } from './table/table.component';

@NgModule({
	declarations: [
		ErrorsComponent,
		FilterBoxComponent,
		FooterComponent,
		HeaderComponent,
		SubMenuComponent,
		TableComponent,
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule,
		// 3rd party scripts
		BsDatepickerModule.forRoot(),
		ButtonsModule.forRoot(),
		FontAwesomeModule,
		ModalModule.forRoot(),
		MyDatePickerModule,
		PaginationModule.forRoot(),
		TabsModule.forRoot(),
		ToastyModule.forRoot(),
	],
	exports: [
		ErrorsComponent,
		FilterBoxComponent,
		FooterComponent,
		HeaderComponent,
		SubMenuComponent,
		TableComponent,
		// 3rd party scripts
		BsDatepickerModule,
		ButtonsModule,
		FontAwesomeModule,
		ModalModule,
		MyDatePickerModule,
		PaginationModule,
		TabsModule,
		ToastyModule,
	]
})
export class CommonComponentsModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far);
	}
}
