import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LOCALE_ID } from '@angular/core';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

import { HomeComponent } from './pages/home/home.component';
import { LogListComponent } from './components/log-list/log-list.component';
import { LogEditComponent } from './components/log-edit/log-edit.component';
import { LogDeleteComponent } from './components/log-delete/log-delete.component';
import { DatabaseAdminComponent } from './pages/database-admin/database-admin.component';
import { LogCounterTodayComponent } from './components/log-counter-today/log-counter-today.component';
import { TimeSinceLastComponent } from './components/time-since-last/time-since-last.component';

const dbConfig: DBConfig  = {
  name: 'cloplog',
  version: 1,
  objectStoresMeta: [{
    store: 'logs',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'datetime', keypath: 'datetime', options: { unique: false } }
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogListComponent,
    LogEditComponent,
    LogDeleteComponent,
    DatabaseAdminComponent,
    LogCounterTodayComponent,
    TimeSinceLastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
