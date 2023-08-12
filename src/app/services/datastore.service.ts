import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from '../db';

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

  countAll(){
    return db.Logs.count();
  }

  countTodayLogs(){
    const lowerBound = new Date();
    lowerBound.setHours(0, 0, 0);
    const upperBound = new Date();
    upperBound.setHours(23, 59, 59);
    return db.Logs.where('timestamp')
      .between(this.getUnixTimestamp(lowerBound), this.getUnixTimestamp(upperBound)).count();
  }

  getTodayLogs(){
    const lowerBound = new Date();
    lowerBound.setHours(0, 0, 0);
    const upperBound = new Date();
    upperBound.setDate(upperBound.getDate() + 1);
    upperBound.setHours(0, 0, 0);
    return db.Logs.where('timestamp')
      .between(this.getUnixTimestamp(lowerBound), this.getUnixTimestamp(upperBound)).toArray();
  }

  update(entry:any) {
    return db.Logs.update(entry.id, entry);
  }

  delete(entry:any){
    return db.Logs.delete(entry.id);
  }

  clear(){
    return db.Logs.clear();
  }

  bulkAdd(logs: any[]){
    return db.Logs.bulkAdd(logs);
  }
}
