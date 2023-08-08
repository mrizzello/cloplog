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
    this.dataStore.countTodayLogs().then((count:number)=>{      
      this.todayLogsCount = count;
    });
  }

}
