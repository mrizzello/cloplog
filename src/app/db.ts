import Dexie, { Table } from 'dexie';

export interface Log {
  id?: number;
  timestamp: number;
}

export class IndexedDBService extends Dexie {
  Logs!: Table<Log, number>;

  constructor() {
    super('cloplog');
    this.version(0.2).stores({
      Logs: '++id,timestamp',
    });
  }
}

export const db = new IndexedDBService();