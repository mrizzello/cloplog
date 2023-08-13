import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { DateFormatService } from '../../services/date-format.service';
import { UpdateDisplayService } from '../../services/update-display.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {

  logs: any[] = [];
  showComponent: boolean = false;
  showEmpty: boolean = false;

  constructor(
    private dataStore: DatastoreService,
    private dateFormat: DateFormatService,
    private udService: UpdateDisplayService
  ) { }

  ngOnInit() {
    this.fetchLogs();
    this.udService.updateDisplay$.subscribe(() => {
      this.fetchLogs();
    });
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
      this.showComponent = true;
      this.showEmpty = this.logs.length === 0;
    });
  }

  monthCount(month: any):number {
    let n = 0;
    month.days.forEach((day:any)=>{
      n+= day.logs.length;
    });
    return n;
  }
}
