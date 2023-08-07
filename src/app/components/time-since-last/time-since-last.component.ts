import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { UpdateDisplayService } from '../../services/update-display.service';

@Component({
  selector: 'app-time-since-last',
  templateUrl: './time-since-last.component.html',
  styleUrls: ['./time-since-last.component.scss']
})
export class TimeSinceLastComponent implements OnInit {

  timeSinceLastLog: string = '';

  private intervalId: any;

  constructor(
    private dataStore: DatastoreService,
    private udService: UpdateDisplayService
  ) { }

  ngOnInit() {
    this.initialize();
    this.udService.updateDisplay$.subscribe(() => {
      this.initialize();
    });
  }

  initialize(){
    this.updateTimeSinceLastLog();
    this.intervalId = setInterval(() => {
      this.updateTimeSinceLastLog();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateTimeSinceLastLog() {
    this.dataStore.getAll().subscribe((logs) => {
      if (logs.length > 0) {
        logs.sort((a: any, b: any) => (a.datetime > b.datetime ? -1 : 1));
        const latestLog:any = logs[0];
        const currentTime = new Date().getTime();
        const logTime = new Date(latestLog.datetime).getTime();
        const timeDifference = currentTime - logTime;
        this.timeSinceLastLog = this.formatTimeDifference(timeDifference);
      } else {
        this.timeSinceLastLog = 'No logs found.';
      }
    });
  }

  formatTimeDifference(timeDifference: number): string {
    const minutes = Math.floor(timeDifference / 60000);

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'}`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} heure${hours === 1 ? '' : 's'}`;
      } else {
        return `${hours} heure${hours === 1 ? '' : 's'} <br />et ${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'}`;
      }
    }
  }

}