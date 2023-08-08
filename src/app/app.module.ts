import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LOCALE_ID, isDevMode } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { LogListComponent } from './components/log-list/log-list.component';
import { LogEditComponent } from './components/log-edit/log-edit.component';
import { LogDeleteComponent } from './components/log-delete/log-delete.component';
import { DatabaseAdminComponent } from './pages/database-admin/database-admin.component';
import { LogCounterTodayComponent } from './components/log-counter-today/log-counter-today.component';
import { TimeSinceLastComponent } from './components/time-since-last/time-since-last.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PageListComponent } from './pages/page-list/page-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogListComponent,
    LogEditComponent,
    LogDeleteComponent,
    DatabaseAdminComponent,
    LogCounterTodayComponent,
    TimeSinceLastComponent,
    PageListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
