import { AuthService } from '@Services/auth/auth.service';
import { StatusAlertService } from '@Services/status-alert/status-alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  isSidenavOpen = false;
  isUserLoggedIn = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private statusAlertService: StatusAlertService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }

  toggleSidenav(open: boolean) {
    this.isSidenavOpen = open;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.statusAlertService.openAlert(
      'You have logged out successfully!',
      'Close',
      1000
    );
  }

  login() {
    this.router.navigate(['/login']);
  }
}
