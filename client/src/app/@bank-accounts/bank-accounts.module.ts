import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modules
import { AppRoutingModule } from './bank-accounts-routing.module';
import { CommonComponentsModule } from '../components/common-components.module';
// Components
import { BaBlockComponent } from './ba-accounts/dash/block/block.component';
// Views
import { BaDashComponent } from './ba-accounts/dash/dash.component';
import { BaEditComponent } from './ba-accounts/edit/edit.component';
import { BaViewComponent } from './ba-accounts/view/view.component';
import { BarAddModalViewComponent } from './ba-records/bar-add-modal/bar-add-modal.component';
import { BarViewComponent } from './ba-records/bar-view/bar-view.component';
import { BarViewAccountComponent } from './ba-records/bar-view-account/bar-view-account.component';
import { BarEditComponent } from './ba-records/edit/edit.component';
import { BarReportComponent } from './ba-records/report/report.component';

@NgModule({
	declarations: [
		// components
		BaBlockComponent,
		BaDashComponent,
		BaEditComponent,
		BaViewComponent,
		BarAddModalViewComponent,
		BarViewComponent,
		BarViewAccountComponent,
		BarEditComponent,
		BarViewComponent,
		BarReportComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		AppRoutingModule,
		CommonComponentsModule,
	],
})
export class bankAccountsModule { }
