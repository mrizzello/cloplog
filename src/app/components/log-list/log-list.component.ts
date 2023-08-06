import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {

  @Input() limit!: number;

  logs: any[] = [];
  showEdit: { [key: number]: boolean } = {};
  showDelete: { [key: number]: boolean } = {};

  constructor(private dataStore: DatastoreService) {}

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs() {
    this.dataStore.getAll().subscribe((logs:any)=>{
      if( logs.length > 0 ){
        logs.sort((a:any, b:any) => (Date.parse(a.datetime) > Date.parse(b.datetime) ? -1 : 1));      
        if( this.limit !== undefined ){
          this.logs = logs.slice(0, this.limit);
        }else{
          this.logs = logs;
        }
      }else{
        this.logs = [];
      }
    })
  }

  onUpdated(data: any) {
    if(data.updated){
      this.fetchLogs();
    }
    this.showEdit[data.log.id] = false;
  }

  onDeleted(data: any) {
    if(data.deleted !== false){
      this.fetchLogs();
    }
    delete(this.showDelete[data.log.id]);
  }
}
