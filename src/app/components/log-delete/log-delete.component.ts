import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-log-delete',
  templateUrl: './log-delete.component.html',
  styleUrls: ['./log-delete.component.scss']
})
export class LogDeleteComponent {

  @Input() log!: any;
  @Output() deleted = new EventEmitter<any>();

  constructor(private dataStore: DatastoreService) {}

  deleteLog() {
    this.dataStore.delete(this.log).subscribe(
      () => {
        this.deleted.emit({
          'deleted':true,
          'log': this.log
        });
      },
      (error) => {
        console.error('Error updating log: ', error);
      }
    );
  }

  cancel(){
    this.deleted.emit({
      'deleted':true,
      'log': this.log
    });
  }
}
