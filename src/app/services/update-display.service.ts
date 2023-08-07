import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDisplayService {
  private updateDisplaySubject = new BehaviorSubject<boolean>(false);
  updateDisplay$ = this.updateDisplaySubject.asObservable();

  updateDisplay() {
    this.updateDisplaySubject.next(true);
  }
}
