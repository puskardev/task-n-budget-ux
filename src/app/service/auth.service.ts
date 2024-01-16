import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:8080';
  TOKEN = 'token';
  AUTHENTICATED_USER = 'authenticaterUser';

  constructor(private http: HttpClient) {}

  public getAuthToken(username: string, password: string) {
    return this.http
      .post<any>('http://localhost:8080/authenticate', {
        username,
        password,
      })
      .pipe(
        map((data: any) => {
          localStorage.setItem(this.TOKEN, data.token);
          localStorage.setItem(this.AUTHENTICATED_USER, username);
          return data;
        })
      );
  }
}
