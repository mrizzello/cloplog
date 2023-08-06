import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.scss']
})
export class LogEditComponent {

  @Input() log!: any;
  @Output() updated = new EventEmitter<any>();

  constructor(private dataStore: DatastoreService) {}

  updateLog() {
    this.dataStore.update(this.log).subscribe(
      () => {
        this.updated.emit({
          'updated':true,
          'log': this.log
        });
      },
      (error) => {
        console.error('Error updating log: ', error);
      }
    );
  }

  cancel(){
    this.updated.emit({
      'updated':false,
      'log': this.log
    });
  }

}
