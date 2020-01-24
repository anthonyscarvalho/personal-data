import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AccountsViewComponent } from './pages/accounts/accounts-view/accounts-view.component';
import { AccountsComponent } from './pages/accounts/accounts/accounts.component';

import { AccountRecordsViewComponent } from './pages/account-records/account-records-view/account-records-view.component';
import { AccountRecordsComponent } from './pages/account-records/account-records/account-records.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'accounts', children: [
      { path: 'view', component: AccountsViewComponent, data: { title: 'View Accounts' }, },
      { path: 'add', component: AccountsComponent, data: { title: 'Add Account' }, },
      { path: 'edit/:id', component: AccountsComponent, data: { title: 'Edit Account' }, }
    ]
  },
  {
    path: 'account-records', children: [
      { path: 'view', component: AccountRecordsViewComponent, data: { title: 'View AccountRecords' }, },
      { path: 'add', component: AccountRecordsComponent, data: { title: 'Add Account Records' }, },
      { path: 'edit/:id', component: AccountRecordsComponent, data: { title: 'Edit Account Record' }, }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
