import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-n-budget-ux';
  isSidenavOpen = false;

  toggleSidenav(open: boolean) {
    this.isSidenavOpen = open;
  }
}
