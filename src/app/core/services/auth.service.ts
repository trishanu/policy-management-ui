import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    return this.http.post(`${environment.apiUrl}/auth/login`, {
      username,
      password
    }).pipe(

      tap((response: any) => {

        localStorage.setItem("token", response.accessToken);

      })

    );

  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

}