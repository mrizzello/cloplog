import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from '../db';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  Logs$ = liveQuery(() => db.Logs.toArray());

  getUnixTimestamp(dateTime:Date) {
    return Math.floor(dateTime.getTime() / 1000);
  }

  getDate(timestamp:number): Date{
    return new Date(timestamp * 1000);
  }

  add(entry: any) {
    entry.timestamp = this.getUnixTimestamp(entry.timestamp);
    return db.Logs.add(entry);
  }

  getAll() {
    return db.Logs.orderBy('timestamp').reverse().toArray();
  }

  getLast(n:number){
    return db.Logs.orderBy('timestamp').reverse().limit(n).toArray();
  }

  countTodayLogs(){
    const lowerBound = new Date();
    lowerBound.setHours(0, 0, 0);
    const upperBound = new Date();
    upperBound.setHours(23, 59, 59);    
    return db.Logs.where('timestamp')
      .between(this.getUnixTimestamp(lowerBound), this.getUnixTimestamp(upperBound)).count();
  }

  update(entry:any) {
    return db.Logs.update(entry.id, entry);
  }

  delete(entry:any){
    return db.Logs.delete(entry.id);
  }

  clear(){
    return Dexie.delete('cloplog');
  }

  bulkAdd(logs: any[]){
    return db.Logs.bulkAdd(logs);
  }
}
