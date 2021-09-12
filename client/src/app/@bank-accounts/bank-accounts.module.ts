import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modules
import { BankAccountsRoutingModule } from './bank-accounts.routing';
import { CommonComponentsModule } from '@common/common.module';
// Components
import { BankAccountsDashBlockComponent } from './_components/bank-accounts-dash-block/bank-accounts-dash-block.component';
// Views
import { BankAccountsDashComponent } from './bank-accounts-dash/bank-accounts-dash.component';
import { BankAccountsEditComponent } from './bank-accounts-edit/bank-accounts-edit.component';

@NgModule({
	declarations: [
		// components
		BankAccountsDashBlockComponent,
		BankAccountsDashComponent,
		BankAccountsEditComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		BankAccountsRoutingModule,
		CommonComponentsModule,
	],
})
export class BankAccountsModule { }
