import { AuthService } from '@Services/auth.service';
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

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }

  toggleSidenav(open: boolean) {
    this.isSidenavOpen = open;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  login() {
    this.router.navigate(['/login']);
  }
}
