import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './pages/landing/app.component';

import { AccountsViewComponent } from './pages/accounts/accounts-view/accounts-view.component';
import { AccountsEditComponent } from './pages/accounts/accounts-edit/accounts-edit.component';
import { AccountsAddComponent } from './pages/accounts/accounts-add/accounts-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AppComponent, data: { title: 'Dashboard' } },
  {
    path: 'accounts', children: [
      { path: '', component: AccountsViewComponent, data: { title: 'View Tasks' }, },
      { path: 'add', component: AccountsAddComponent, data: { title: 'Add Task' }, },
      { path: ':id', component: AccountsEditComponent, data: { title: 'Edit Task' }, }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
