import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  _formatDate(dateObj: Date): string {
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return this._formatDate(date);
  }

  formatDateContext(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const currentDate = new Date();

    const isToday = date.toDateString() === currentDate.toDateString();
    currentDate.setDate(currentDate.getDate() - 1);
    const isYesterday = date.toDateString() === currentDate.toDateString();

    if (isToday) {
      return 'aujourd\'hui';
    } else if (isYesterday) {
      return 'hier';
    } else {
      return this._formatDate(date);
    }

  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
