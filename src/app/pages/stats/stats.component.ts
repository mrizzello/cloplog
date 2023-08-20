import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class StatsComponent {

  logs: any[] = [];

  constructor(
    private dataStore: DatastoreService
  ) { }

  ngOnInit() {
    this.dataStore.getLastDays(14).then((logs: any[]) => {
      this.logs = logs;
    });
  }
}
