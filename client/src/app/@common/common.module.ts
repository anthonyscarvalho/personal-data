import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
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
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LoadingComponent } from './loading/loading.component';
import { InputsComponent } from './inputs/inputs.component';

@NgModule({
	declarations: [
		ErrorsComponent,
		FilterBoxComponent,
		FooterComponent,
		HeaderComponent,
		InputsComponent,
		LoadingComponent,
		SideMenuComponent,
		SubMenuComponent,
		TableComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		// 3rd party scripts
		BsDatepickerModule.forRoot(),
		ButtonsModule.forRoot(),
		FontAwesomeModule,
		ModalModule.forRoot(),
		PaginationModule.forRoot(),
		TabsModule.forRoot(),
		ToastyModule.forRoot(),
	],
	exports: [
		ErrorsComponent,
		FilterBoxComponent,
		FooterComponent,
		HeaderComponent,
		InputsComponent,
		LoadingComponent,
		SideMenuComponent,
		SubMenuComponent,
		TableComponent,
		// 3rd party scripts
		BsDatepickerModule,
		ButtonsModule,
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
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far);
	}
}

export function getDatepickerConfig(): BsDatepickerConfig {
	return Object.assign(new BsDatepickerConfig(), {
		dateInputFormat: 'YYYY-MM-DD',
		showClearButton: true,
		containerClass: `theme-dark-blue`
	});
}
