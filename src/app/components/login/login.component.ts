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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleLogin() {
    this.authService.getAuthToken(this.username, this.password).subscribe(
      (data) => {
        this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
