import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private authUrl = 'http://localhost:5000/api/v1/auth';
  private token: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  login(email: string, password: string) {
    const credentials = {
      email,
      password,
    };
    console.log('In login service', credentials);
    let header = new HttpHeaders().set('Content-type', 'application/json');
    let options = {
      headers: header,
    };

    return this.http
      .post<{ token: string }>(this.authUrl + `/login`, credentials, options)
      .subscribe((response) => {
        const token = response.token;
        console.log(token);
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.http.get(this.authUrl + `/logout`).subscribe((response) => {
      console.log('Logged out');
      this.token = 'none';
      this.isAuthenticated = false;
      this.router.navigate(['/login']);
    });
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
}
