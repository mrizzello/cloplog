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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.dataStore.getAll().subscribe((logs) => {
      this.todayLogsCount = logs.filter((log:any) => {
        const logDate = new Date(log.datetime);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === today.getTime();
      }).length;
    });
  }

}
