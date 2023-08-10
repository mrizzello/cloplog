import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { DateFormatService } from '../../services/date-format.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {

  logs: any[] = [];

  constructor(
    private dataStore: DatastoreService,
    private dateFormat: DateFormatService
  ) { }

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs() {
    this.dataStore.getAll().then((logs: any[]) => {
      const groupedLogs: {
        month: string,
        days: {
          date: string,
          logs: any[]
        }[]
      }[] = [];

      logs.forEach((log: any) => {
        let logDate = this.dateFormat.formatDate(log.timestamp);
        let logMonth = this.dateFormat.formatYearMonth(log.timestamp); // Format month only

        if (new Date(log.timestamp).getHours() >= 0 && new Date(log.timestamp).getHours() < 4) {
          logDate = this.dateFormat.formatDate(log.timestamp - 24 * 60 * 60);
        }

        let existingMonthGroup = groupedLogs.find(group => group.month === logMonth);
        if (!existingMonthGroup) {
          existingMonthGroup = { month: logMonth, days: [] };
          groupedLogs.push(existingMonthGroup);
        }

        let existingDayGroup = existingMonthGroup.days.find(day => day.date === logDate);
        if (!existingDayGroup) {
          existingDayGroup = { date: logDate, logs: [] };
          existingMonthGroup.days.push(existingDayGroup);
        }

        existingDayGroup.logs.push(log);
      });

      this.logs = groupedLogs;
    });
  }

  onDeleted($event: boolean) {
    this.fetchLogs();
  }
  onUpdated($event: boolean) {
    this.fetchLogs();
  }

}
