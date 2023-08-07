import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cloplog';

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    private dbService: NgxIndexedDBService,
    private router: Router
  ) {
  }
  
  navigateAndCloseNav(path:string): void {
    this.router.navigate([path]);
    this.drawer.close();
  }
}
