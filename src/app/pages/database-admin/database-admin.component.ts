import { Component } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-database-admin', // Updated selector
  templateUrl: './database-admin.component.html',
  styleUrls: ['./database-admin.component.scss']
})
export class DatabaseAdminComponent { // Updated class name

  clearingDatabase: boolean = false;
  importingDatabase: boolean = false;

  constructor(private dataStore: DatastoreService) { }

  exportToCSV() {
    this.dataStore.getAll().subscribe((logs) => {
      if (logs.length > 0) {
        const csvData = this.convertToCSV(logs);
        this.downloadCSVFile(csvData);
      } else {
        console.warn('No data to export.');
      }
    }, (error) => {
      console.error('Error fetching logs: ', error);
    });
  }

  convertToCSV(data: any[]): string {
    const csvRows = [];
    const headers = ['id','timestamp','datetime'];
    csvRows.push(headers.join(','));

    for (const item of data) {
      const timestamp = Math.floor(new Date(item.datetime).getTime() / 1000);
      const newData = {
        ...item,
        datetime: item.datetime,
        timestamp: timestamp
      };
      const values = headers.map((header) => newData[header]);
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  downloadCSVFile(csvData: string) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const now = new Date();
    let filename = "cloplog-";
    filename += now.getFullYear();
    filename += ("0" + (now.getMonth()+1)).slice(-2);
    filename += ("0" + now.getDate()).slice(-2);
    filename += ("0" + now.getHours()).slice(-2);
    filename += ("0" + now.getMinutes()).slice(-2);
    filename += ("0" + now.getSeconds()).slice(-2);
    filename += ".csv";

    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(url);
  }

  resetIndexedDB() {
    if (confirm('Are you sure you want to reset the IndexedDB? This action cannot be undone.')) {
      this.clearingDatabase = true;
      this.dataStore.resetDB().subscribe((response) => {
        if (response === true) {
          this.clearingDatabase = false;
        }else{
          console.error('Error clearing IndexedDB');
        }
      });
    }
  }

  importCSV(event: any) {
    this.importingDatabase = true;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvData = event.target?.result as string;
      const logs = this.parseCSV(csvData);
      if (logs.length > 0) {
        this.dataStore.bulkAdd(logs).subscribe((response) => {
          this.importingDatabase = false;
          window.location.reload();
        });
      } else {
        console.warn('No data found in the CSV file.');
      }
    };

    reader.readAsText(file);
  }

  parseCSV(csvData: string): any[] {
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');

    const logs = [];

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(',');
      const log = {
        id: parseInt(values[0]),
        datetime: new Date(parseInt(values[1]) * 1000),
      };
      logs.push(log);
    }

    return logs;
  }

}
