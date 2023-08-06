import { Component, ViewChild } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { LogListComponent } from '../../components/log-list/log-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  lastLogsLimit: number = 5;

  @ViewChild(LogListComponent)
  private logList!: LogListComponent;

  constructor(
    private dataStore: DatastoreService
  ) {
  }

  Log() {
    const currentDateTime = new Date();
    this.dataStore.add({ datetime: currentDateTime }).subscribe(
      (key) => {
        this.logList.fetchLogs();
      },
      (error) => {
        console.error('Error adding entry to IndexedDB: ', error);
      }
    );
  }

}
