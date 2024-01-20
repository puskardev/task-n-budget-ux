import { AuthService } from '@Services/auth/auth.service';
import { StatusAlertService } from '@Services/status-alert/status-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  hidePassword: boolean = true;
  loginError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private statusAlertService: StatusAlertService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService
      .handleAuthentication(this.username, this.password)
      .subscribe({
        next: (data) => {
          this.router.navigate(['home']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404 || error.status === 401) {
            // Set login error flag if unauthorized or not found
            this.loginError = true;
          } else {
            this.statusAlertService.openAlert(
              'Login Failed, Please try again.',
              'Close'
            );
          }
          console.log(error);
        },
        complete: () => {
          this.router.navigate(['home']);
        },
      });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  register() {
    this.router.navigate(['/register']);
  }
}
