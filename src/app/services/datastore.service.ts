import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

interface LogEntry {
  datetime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  private tableName: string = 'logs';

  constructor(private dbService: NgxIndexedDBService) {}

  public add(entry: any) {
    return this.dbService.add(this.tableName, entry);
  }

  public getAll() {    
    return this.dbService.getAll(this.tableName);
  }

  public update(entry:any){
    return this.dbService.update(this.tableName, entry);
  }

  public delete(entry:any){
    return this.dbService.deleteByKey(this.tableName, entry.id);
  }

  public resetDB(){
    return this.dbService.clear(this.tableName);
  }

  public bulkAdd(logs: any[]){
    return this.dbService.bulkAdd(this.tableName, logs);
  }
}
