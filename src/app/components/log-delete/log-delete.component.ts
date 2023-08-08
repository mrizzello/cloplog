import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatastoreService } from '../../services/datastore.service';
import { DateFormatService } from '../../services/date-format.service';

@Component({
  selector: 'app-log-delete',
  templateUrl: './log-delete.component.html',
  styleUrls: ['./log-delete.component.scss']
})
export class LogDeleteComponent {

  log: any;

  constructor(
    private dataStore: DatastoreService,
    public dialogRef: MatDialogRef<LogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateFormat : DateFormatService
  ) {
    this.log = data;
  }

  onDeleteClick(): void {
    this.dataStore.delete(this.log).then(() => {
      this.dialogRef.close(this.log);
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  formatDate(timestamp: number): string {
    return this.dateFormat.formatDate(timestamp);
  }

  formatTime(timestamp: number): string {
    return this.dateFormat.formatTime(timestamp);
  }

}
