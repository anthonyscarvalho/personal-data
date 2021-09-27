import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modules
import { AccountRecordsRoutingModule } from './account-records.routing';
import { CommonComponentsModule } from '@common/common.module';
// Components
// import { BaBlockComponent } from './ba-accounts/dash/block/block.component';
// Views
import { AccountRecordsEditComponent } from './components/account-records-edit/account-records-edit.component';
import { AccountRecordsReportComponent } from './components/account-records-report/account-records-report.component';
import { AccountRecordsViewComponent } from './components/account-records-view/account-records-view.component';
import { AccountRecordsImportComponent } from './components/account-records-import/account-records-import.component';
// import { BAccountRecordsViewComponent } from './ba-records/bar-view/bar-view.component';
// import { BarViewAccountComponent } from './ba-records/bar-view-account/bar-view-account.component';
// import { BarEditComponent } from './ba-records/edit/edit.component';
// import { BAccountRecordsReportComponent } from './ba-records/report/report.component';

@NgModule({
	declarations: [
		// components
		AccountRecordsEditComponent,
		AccountRecordsReportComponent,
		AccountRecordsViewComponent,
		AccountRecordsImportComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		AccountRecordsRoutingModule,
		CommonComponentsModule,
	],
})
export class AccountRecordsModule { }
