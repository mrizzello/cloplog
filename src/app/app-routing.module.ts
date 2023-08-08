import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DatabaseAdminComponent } from './pages/database-admin/database-admin.component';
import { PageListComponent } from './pages/page-list/page-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'log-list', component: PageListComponent },
  { path: 'settings', component: DatabaseAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
