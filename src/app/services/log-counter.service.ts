import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogCounterService {
  private logsCountSubject = new BehaviorSubject<boolean>(false);
  logsCount$ = this.logsCountSubject.asObservable();

  updateLogsCount() {
    this.logsCountSubject.next(true);
  }

  doTheMath(logs: any[]) {
    const groupedLogs: any[] = [];
    logs.forEach((log: any) => {
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

    let averageLogsPerDay = (logs.length / groupedLogs.length).toFixed(1);

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
        if (timeDiff < shortestDiff) {
          shortestDiff = timeDiff;
        }
        if (timeDiff > longestDiff) {
          longestDiff = timeDiff;
        }
      }
    });
    shortestDiff = Math.round(shortestDiff / 60);
    longestDiff = Math.round(longestDiff / 60);

    let averageTimeInMinutes = Math.round(totalDiff / totalCount / 60);

    return {
      averageLogsPerDay: averageLogsPerDay,
      longestDiff: longestDiff,
      shortestDiff: shortestDiff,
      averageTimeInMinutes: averageTimeInMinutes,
      lastTimestamp: logs[0].timestamp
    }
  }
}
