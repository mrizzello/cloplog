import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatastoreService } from '../../services/datastore.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: { parse: { dateInput: 'DD/MM/YYYY' }, display: { dateInput: 'DD/MM/YYYY' } } }
  ]
})
export class LogEditComponent {

  log: any;
  oTimestamp: any;
  dateValue: any;
  timeValue: any;

  constructor(
    private dataStore: DatastoreService,
    public dialogRef: MatDialogRef<LogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.log = data;    
    this.oTimestamp = this.log.timestamp;
    this.dateValue = this.dataStore.getDate(this.oTimestamp);
    this.timeValue = String(this.dateValue.getHours()).padStart(2, '0')+':'+String(this.dateValue.getMinutes()).padStart(2, '0');
  }

  onSaveClick(): void {
    const time = this.timeValue.split(':');
    this.log.timestamp = this.dataStore.getUnixTimestamp(new Date(
      this.dateValue.getFullYear(),
      this.dateValue.getMonth(),
      this.dateValue.getDate(),
      time[0],
      time[1],
      this.dateValue.getSeconds()
    ));
    this.dataStore.update(this.log).then(() => {
      this.dialogRef.close(this.log);
    });
  }

  onCancelClick(): void {
    this.log.timestamp = this.oTimestamp;
    this.dialogRef.close();
  }

}
