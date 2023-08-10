import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateFormatService } from '../../services/date-format.service';
import { UpdateDisplayService } from '../../services/update-display.service';
import { LogEditComponent } from '../../components/log-edit/log-edit.component';
import { LogDeleteComponent } from '../../components/log-delete/log-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.scss']
})
export class LogItemComponent {

  @Input() log!: any;
  @Input() context: boolean = false;

  constructor(
    private dateFormat: DateFormatService,
    private udService: UpdateDisplayService,
    private dialog: MatDialog,
  ) { }

  formatDate(timestamp: number): string {
    if (this.context) {
      return this.dateFormat.formatDateContext(timestamp);
    }
    return this.dateFormat.formatDate(timestamp);
  }

  formatTime(timestamp: number): string {
    return this.dateFormat.formatTime(timestamp);
  }

  openEditDialog(log: any) {
    const dialogRef = this.dialog.open(LogEditComponent, {
      data: log
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.udService.updateDisplay();
      }
    });
  }

  openDeleteDialog(log: any) {
    const dialogRef = this.dialog.open(LogDeleteComponent, {
      data: log
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.udService.updateDisplay();
      }
    });
  }

}
