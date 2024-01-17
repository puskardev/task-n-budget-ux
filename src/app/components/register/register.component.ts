import { passwordMatchValidator } from '@Constants/password-validator';
import { User } from '@Models/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  signupForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  hidePassword: boolean = true;

  passwordMismatch: boolean = false;

  registerComplete: boolean = false;
  registeredUser: string = 'pdev';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    return this.signupForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    if (this.signupForm.valid) {
      const user: User = {
        username: this.signupForm.get('username')?.value as string,
        password: this.signupForm.get('password')?.value as string,
        firstName: this.signupForm.get('firstName')?.value as string,
        lastName: this.signupForm.get('lastName')?.value as string,
        email: this.signupForm.get('email')?.value as string,
      };

      this.http.post<User>('http://localhost:8080/register', user).subscribe({
        next: (data: User) => {
          this.registerComplete = true;
          this.registeredUser = data.username;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}