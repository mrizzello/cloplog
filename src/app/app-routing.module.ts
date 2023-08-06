import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LogListComponent } from './components/log-list/log-list.component';
import { DatabaseAdminComponent } from './pages/database-admin/database-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'log-list', component: LogListComponent },
  { path: 'settings', component: DatabaseAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
