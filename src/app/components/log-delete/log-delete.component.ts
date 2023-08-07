import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatastoreService } from '../../services/datastore.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.log = data;
  }

  onDeleteClick(): void {
    this.dataStore.delete(this.log).subscribe(() => {
      this.dialogRef.close(this.log);
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  formatDate(datetimeString: string): string {
    const dateObj = new Date(datetimeString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;    
  }

  formatTime(datetimeString: string): string {
    const dateObj = new Date(datetimeString);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
