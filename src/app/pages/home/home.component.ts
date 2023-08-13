import { Component, ViewChild } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { LogListComponent } from '../../components/log-list/log-list.component';
import { UpdateDisplayService } from '../../services/update-display.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {

  lastLogsLimit: number = 4;
  cssClicked: string = '';

  @ViewChild(LogListComponent) private logList!: LogListComponent;

  constructor(
    private dataStore: DatastoreService,
    private udService: UpdateDisplayService
  ) {
  }

  onDone($event: any) {
    this.doClick();
    setInterval(() => {
      this.doClick();
    }, 5000);
  }

  doClick() {
    this.cssClicked = 'clicked';
    setTimeout(() => {
      this.cssClicked = '';
    }, 200)
  }

  Log() {
    this.cssClicked = 'clicked';
    const now = new Date();
    this.dataStore.add({ timestamp: now }).then((key) => {
      this.udService.updateDisplay();
      setTimeout(() => {
        this.cssClicked = '';
      }, 200)
    });
  }

}
