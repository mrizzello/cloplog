import { Component, OnDestroy } from '@angular/core';
import { DateFormatService } from '../../services/date-format.service';
import { LogCounterService } from 'src/app/services/log-counter.service';
import { DatastoreService } from '../../services/datastore.service';
import { interval, Subscription } from 'rxjs';
import { UpdateDisplayService } from 'src/app/services/update-display.service';

@Component({
  selector: 'app-log-next',
  templateUrl: './log-next.component.html',
  styleUrls: ['./log-next.component.scss']
})
export class LogNextComponent implements OnDestroy {

  factor: number = 1.1;
  nextTimestamp!: number;
  nextTime!: string;
  cssClass: string = 'no';
  subscription: Subscription;
  loading: boolean = true;

  constructor(
    private dateFormat: DateFormatService,
    private logCounter: LogCounterService,
    private dataStore: DatastoreService,
    private udService: UpdateDisplayService
  ) {
    this.initialize()
    this.subscription = interval(1000).subscribe(() => {
      this.checkCurrentTime();
    });
    this.udService.updateDisplay$.subscribe(() => {
      this.initialize();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initialize(){
    this.dataStore.getAll().then((logs: any[]) => {
      if(logs.length > 1){
        let tmp = this.logCounter.doTheMath(logs);
        this.nextTimestamp = Math.round(tmp.lastTimestamp + tmp.averageTimeInMinutes * 60 * this.factor);
        this.nextTime = this.dateFormat.formatTime(this.nextTimestamp);
        this.checkCurrentTime();
      }else{
        this.nextTime = '';
      }
      this.loading = false;
    });
  }

  checkCurrentTime() {
    const currentTimestamp = Math.round(new Date().getTime() / 1000);
    if (currentTimestamp >= this.nextTimestamp) {
      this.cssClass = 'go';
    } else {
      this.cssClass = 'no';
    }
  }

}
