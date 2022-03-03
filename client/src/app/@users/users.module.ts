import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Modules
import { UsersRoutingModule } from './users.routing';
import { CommonComponentsModule } from '@common/common.module';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { UsersEditComponent } from './components/users-edit/users-edit.component';
import { UsersViewComponent } from './components/users-view/users-view.component';

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
