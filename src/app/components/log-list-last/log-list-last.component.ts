import { Component, Input } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { UpdateDisplayService } from '../../services/update-display.service';

@Component({
  selector: 'app-log-list-last',
  templateUrl: './log-list-last.component.html',
  styleUrls: ['./log-list-last.component.scss']
})
export class LogListLastComponent {

  @Input() limit!: number;
  logs: any[] = [];
  showComponent: boolean = false;
  showEmpty: boolean = false;

  constructor(
    private dataStore: DatastoreService,
    private udService: UpdateDisplayService
  ) { }

  ngOnInit() {
    this.fetchLogs();
    this.udService.updateDisplay$.subscribe(() => {
      this.fetchLogs();
    });
  }

  fetchLogs() {
    this.dataStore.getLast(this.limit).then((logs:any)=>{
      this.logs = logs;
      this.showComponent = true;
      this.showEmpty = this.logs.length === 0;
    });
  }

  onDeleted($event: boolean) {
    this.fetchLogs();
  }
  onUpdated($event: boolean) {
    this.fetchLogs();
  }
  
}
