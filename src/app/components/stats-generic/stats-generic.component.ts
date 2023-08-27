import { Component, Input } from '@angular/core';
import { DateFormatService } from '../../services/date-format.service';
import { LogCounterService } from 'src/app/services/log-counter.service';

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
  numerOfDays!: number;
  loading: boolean = true;

  constructor(
    private dateFormat: DateFormatService,
    private logCounter: LogCounterService
  ) { }

  ngOnInit() {
    let tmp = this.logCounter.doTheMath(this.logs);
    this.averageLogsPerDay = tmp.averageLogsPerDay;
    this.shortestDiff = this.dateFormat.formatHoursMinutes(tmp.shortestDiff);
    this.longestDiff = this.dateFormat.formatHoursMinutes(tmp.longestDiff);
    this.averageTimeBetween2Logs = this.dateFormat.formatHoursMinutes(tmp.averageTimeInMinutes);
    this.numerOfDays = tmp.numerOfDays;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
