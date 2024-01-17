import { AUTH_CONSTANTS } from '@Constants/auth-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticateUrl = environment.apiUrl + '/authenticate';
  
  constructor(private http: HttpClient) {}

  public handleAuthentication(username: string, password: string) {
    return this.http
      .post<any>(this.authenticateUrl, {
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
}
