import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { UpdateDisplayService } from '../../services/update-display.service';

@Component({
  selector: 'app-log-counter-today',
  templateUrl: './log-counter-today.component.html',
  styleUrls: ['./log-counter-today.component.scss']
})
export class LogCounterTodayComponent implements OnInit {

  todayLogsCount: number = 0;
  loading: boolean = true;

  constructor(
    private dataStore: DatastoreService,
    private udService: UpdateDisplayService
  ) { }

  ngOnInit() {
    this.countTodayLogs();
    this.udService.updateDisplay$.subscribe(() => {
      this.countTodayLogs();
    });
  }

  countTodayLogs() {
    this.dataStore.countAll().then((count) => {
      if (count > 0) {
        this.dataStore.countTodayLogs().then((count: number) => {
          this.todayLogsCount = count;
        });
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

}
