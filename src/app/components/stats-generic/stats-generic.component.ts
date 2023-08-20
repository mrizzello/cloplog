import { Component, Input } from '@angular/core';
import { DateFormatService } from '../../services/date-format.service';

@Component({
  selector: 'app-stats-generic',
  templateUrl: './stats-generic.component.html',
  styleUrls: ['./stats-generic.component.scss']
})
export class StatsGenericComponent {

  @Input() logs!: any;
  averageLogsPerDay!: string;
  averageTimeBetween2Logs!: string;
  shortestDiff!: string;
  longestDiff!: string;

  constructor(
    private dateFormat: DateFormatService
  ) { }

  ngOnInit() {
    this.doTheMath();
  }

  doTheMath() {
    const groupedLogs: any[] = [];
    this.logs.forEach((log: any) => {
      const logDate = new Date(log.timestamp * 1000);
      logDate.setUTCHours(4, 0, 0, 0);
      const logDateString = logDate.toISOString().split('T')[0];      
      const existingGroup = groupedLogs.find(group => group.date === logDateString);      
      if (existingGroup) {
        existingGroup.logs.push(log);
      } else {
        groupedLogs.push({ date: logDateString, logs: [log] });
      }
    });

    this.averageLogsPerDay = (this.logs.length / groupedLogs.length).toFixed(1);
    
    let totalDiff = 0;
    let totalCount = 0;
    let shortestDiff = 1E6;
    let longestDiff = 0;
    groupedLogs.forEach(day => {
      const logs = day.logs;
      for (let i = 1; i < logs.length; i++) {
        const timeDiff = logs[i - 1].timestamp - logs[i].timestamp;
        totalDiff += timeDiff;
        totalCount++;
        if(timeDiff < shortestDiff){
          shortestDiff = timeDiff;
        }
        if(timeDiff > longestDiff){
          longestDiff = timeDiff;
        }
      }
    });
    shortestDiff = Math.round(shortestDiff / 60);
    longestDiff = Math.round(longestDiff / 60);
    this.shortestDiff = this.dateFormat.formatHoursMinutes(shortestDiff);
    this.longestDiff = this.dateFormat.formatHoursMinutes(longestDiff);
  
    if (totalCount === 0) {
      this.averageTimeBetween2Logs = '-';
    }else{
      const averageTimeInMinutes = Math.round(totalDiff / totalCount / 60);
      this.averageTimeBetween2Logs = this.dateFormat.formatHoursMinutes(averageTimeInMinutes);
    }

  }

}
