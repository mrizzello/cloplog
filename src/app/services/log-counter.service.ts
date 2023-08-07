import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogCounterService {
  private logsCountSubject = new BehaviorSubject<boolean>(false);
  logsCount$ = this.logsCountSubject.asObservable();

  updateLogsCount() {
    this.logsCountSubject.next(true);
  }
}
