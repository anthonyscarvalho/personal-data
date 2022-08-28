import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastyModule } from 'ng2-toasty';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// module
import {
	NumberOnly,
} from '@common/directives';
import {
	ErrorsComponent,
	FilterBoxComponent,
	HeaderComponent,
	FooterComponent,
	SubMenuComponent,
	TableComponent,
	SideMenuComponent,
	LoadingComponent,
	InputsComponent,
	TablePaginationComponent
} from '@common/components';

const allComponents = [
	ErrorsComponent,
	FilterBoxComponent,
	FooterComponent,
	HeaderComponent,
	InputsComponent,
	LoadingComponent,
	SideMenuComponent,
	SubMenuComponent,
	TableComponent,
	TablePaginationComponent,
];

const allDirectives = [
	NumberOnly
];

@NgModule({
	declarations: [
		...allComponents,
		...allDirectives,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		// 3rd party scripts
		BsDatepickerModule.forRoot(),
		ButtonsModule.forRoot(),
		ChartsModule,
		CKEditorModule,
		FontAwesomeModule,
		ModalModule.forRoot(),
		PaginationModule.forRoot(),
		TabsModule.forRoot(),
		ToastyModule.forRoot(),
	],
	exports: [
		...allComponents,
		...allDirectives,
		// 3rd party scripts
		BsDatepickerModule,
		ButtonsModule,
		ChartsModule,
		FontAwesomeModule,
		ModalModule,
		PaginationModule,
		TabsModule,
		ToastyModule,
	],
	providers: [{
		provide: BsDatepickerConfig,
		useFactory: getDatepickerConfig
	}]
})
export class CommonComponentsModule {
	constructor(iconLibrary: FaIconLibrary) {
		iconLibrary.addIconPacks(fas, far);
	}
}

export function getDatepickerConfig(): BsDatepickerConfig {
	return Object.assign(new BsDatepickerConfig(), {
		dateInputFormat: 'YYYY-MM-DD',
		showClearButton: true,
		containerClass: `theme-dark-blue`
	});
}
