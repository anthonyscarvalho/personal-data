import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AccountsViewComponent } from './pages/accounts/accounts-view/accounts-view.component';
import { AccountsComponent } from './pages/accounts/accounts/accounts.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'accounts', children: [
      { path: 'view', component: AccountsViewComponent, data: { title: 'View Tasks' }, },
      { path: 'add', component: AccountsComponent, data: { title: 'Add Task' }, },
      { path: 'edit/:id', component: AccountsComponent, data: { title: 'Edit Task' }, }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
