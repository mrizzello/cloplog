import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cloplog';

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.lockScreenOrientation();
  }

  lockScreenOrientation() {
    if (window.screen.orientation) {
      window.screen.orientation.lock('portrait').then(
        success => {return},
        failure => {return}
      );
    }
  }

  navigateAndCloseNav(path: string): void {
    this.router.navigate([path]);
    this.drawer.close();
  }
}
