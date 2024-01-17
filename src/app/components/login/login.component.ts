import { AuthService } from '@Services/auth.service';
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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService
      .handleAuthentication(this.username, this.password)
      .subscribe({
        next: (data) => {
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.log(error);
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
