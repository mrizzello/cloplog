import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogEditComponent } from '../../components/log-edit/log-edit.component';
import { LogDeleteComponent } from '../../components/log-delete/log-delete.component';
import { DatastoreService } from '../../services/datastore.service';
import { UpdateDisplayService } from '../../services/update-display.service';
import { DateFormatService } from '../../services/date-format.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {

  @Input() limit!: number;

  logs: any[] = [];

  constructor(
    private dataStore: DatastoreService,
    private dialog: MatDialog,
    private udService: UpdateDisplayService,
    private dateFormat: DateFormatService
  ) {}

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs() {
    if(this.limit !== undefined){
      this.dataStore.getLast(this.limit).then((logs:any)=>{      
        this.logs = logs;
      });
    }else{
      this.dataStore.getAll().then((logs:any)=>{      
        this.logs = logs;
      });
    }
    this.udService.updateDisplay();
  }

  openEditDialog(log: any) {
    const dialogRef = this.dialog.open(LogEditComponent, {
      data: log
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchLogs();
      }
    });
  }

  openDeleteDialog(log: any) {
    const dialogRef = this.dialog.open(LogDeleteComponent, {
      data: log
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchLogs();
      }
    });
  }

  formatDate(timestamp: number): string {
    if(this.limit !== undefined){
      return this.dateFormat.formatDateContext(timestamp);
    }
    return this.dateFormat.formatDate(timestamp);
  }

  formatTime(timestamp: number): string {
    return this.dateFormat.formatTime(timestamp);
  }
  
}
