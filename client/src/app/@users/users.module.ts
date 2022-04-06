import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// modules
import { UsersRoutingModule } from './users.routing';
import { CommonComponentsModule } from '@common/common.module';
// components
import { UsersDashboardComponent } from './views/users-dashboard/users-dashboard.component';
import { UsersEditComponent } from './views/users-edit/users-edit.component';
import { UsersViewComponent } from './views/users-view/users-view.component';

@NgModule({
	declarations: [
		UsersDashboardComponent,
		UsersEditComponent,
		UsersViewComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		UsersRoutingModule,
		CommonComponentsModule,
	],
})
export class UsersModule { }
