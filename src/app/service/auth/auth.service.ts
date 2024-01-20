import { AUTH_CONSTANTS } from '@Constants/auth-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map } from 'rxjs';
import { API_ENDPOINTS } from '@Constants/api-endpoints';
import { User } from '@Models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public handleAuthentication(username: string, password: string) {
    if (!environment.production) {
      localStorage.setItem(AUTH_CONSTANTS.TOKEN, '');
      localStorage.setItem(AUTH_CONSTANTS.AUTHENTICATED_USER, username);
      return EMPTY;
    }

    return this.http
      .post<any>(API_ENDPOINTS.authenticate, {
        username,
        password,
      })
      .pipe(
        map((data: any) => {
          localStorage.setItem(AUTH_CONSTANTS.TOKEN, data.token);
          localStorage.setItem(AUTH_CONSTANTS.AUTHENTICATED_USER, username);
          return data;
        })
      );
  }

  public logout() {
    localStorage.removeItem(AUTH_CONSTANTS.TOKEN);
    localStorage.removeItem(AUTH_CONSTANTS.AUTHENTICATED_USER);
  }

  public getAuthenticatedUser() {
    return localStorage.getItem(AUTH_CONSTANTS.AUTHENTICATED_USER);
  }

  public getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return localStorage.getItem(AUTH_CONSTANTS.TOKEN);
    }
    return null;
  }

  public isUserLoggedIn() {
    let user = localStorage.getItem(AUTH_CONSTANTS.AUTHENTICATED_USER);
    return user !== null;
  }

  public register(user: User) {
    return this.http.post<User>(API_ENDPOINTS.register, user).pipe(
      map((data: User) => {
        return data;
      })
    );
  }

  // this.http.post<User>(API_ENDPOINTS.register, user).subscribe({
  //   next: (data: User) => {
  //     this.registerComplete = true;
  //     this.registeredUser = data.username;
  //   },
  //   error: (error) => {
  //     console.log(error);
  //   },
  // });
}
