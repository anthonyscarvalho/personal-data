import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FileUploadModule } from "ng2-file-upload";
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// module
import {
	NumberOnly,
} from '@common/directives';
import {
	ErrorsComponent,
	FilterBoxComponent,
	FooterComponent,
	HeaderComponent,
	InputsComponent,
	LoadingComponent,
	PageComponent,
	SideMenuComponent,
	SubMenuComponent,
	TableComponent,
	TablePaginationComponent,
	UploaderComponent
} from '@common/components';

const allComponents = [
	ErrorsComponent,
	FilterBoxComponent,
	FooterComponent,
	HeaderComponent,
	InputsComponent,
	LoadingComponent,
	PageComponent,
	SideMenuComponent,
	SubMenuComponent,
	TableComponent,
	TablePaginationComponent,
	UploaderComponent,
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
		CKEditorModule,
		FileUploadModule,
		FontAwesomeModule,
		ModalModule.forRoot(),
		PaginationModule.forRoot(),
		TabsModule.forRoot(),
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-left',
			newestOnTop: true,
			maxOpened: 10
		}),
	],
	exports: [
		...allComponents,
		...allDirectives,
		// 3rd party scripts
		BsDatepickerModule,
		ButtonsModule,
		FontAwesomeModule,
		ModalModule,
		PaginationModule,
		TabsModule,
		ToastrModule,
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
