import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogEditComponent } from '../../components/log-edit/log-edit.component';
import { LogDeleteComponent } from '../../components/log-delete/log-delete.component';
import { DatastoreService } from '../../services/datastore.service';
import { UpdateDisplayService } from '../../services/update-display.service';

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
    private udService: UpdateDisplayService
  ) {}

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
      this.udService.updateDisplay();
    })
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

  _formatDate(dateObj: Date): string{
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  formatDate(datetimeString: string): string {
    const dateObj = new Date(datetimeString);

    if(this.limit !== undefined){
      const currentDate = new Date();
  
      const isToday = dateObj.toDateString() === currentDate.toDateString();
      currentDate.setDate(currentDate.getDate() - 1);
      const isYesterday = dateObj.toDateString() === currentDate.toDateString();
    
      if (isToday) {
        return 'aujourd\'hui';
      } else if (isYesterday) {
        return 'hier';
      } else {
        return this._formatDate(dateObj);
      }
    }

    return this._formatDate(dateObj);
    
  }

  formatTime(datetimeString: string): string {
    const dateObj = new Date(datetimeString);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  
}
