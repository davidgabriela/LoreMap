import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import { map, Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private authUrl = 'http://localhost:5000/api/v1/auth';
  private token: string = '';
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient,
    private router: Router,
    private cookieService: CookieService) {}

  getToken() {
    return this.token;
  }

  login(email: string, password: string) {
    const credentials = {
      email,
      password,
    };
    let header = new HttpHeaders().set('Content-type', 'application/json');
    let options = {
      headers: header,
    };

    return this.http
      .post<{ token: string; expiresIn: Date }>(
        this.authUrl + `/login`,
        credentials,
        options
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expirationDate = response.expiresIn;
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.http.get(this.authUrl + `/logout`).subscribe((response) => {
      this.token = 'none';
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.clearAuthData();
      this.router.navigate(['/login']);
    });
  }

  getCurrentUser(): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`,
    });

    console.log(headers)

    return this.http
      .get(this.authUrl + `/me`, { headers: headers })
      .pipe(map((data: any) => data.data));
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = this.cookieService.get('token');
    const expirationDate = this.cookieService.get('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  private saveAuthData(token: string, expirationDate: Date) {
    this.cookieService.set('token', token)
    this.cookieService.set('expiration', expirationDate.toString());
  }

  private clearAuthData() {
    this.cookieService.deleteAll()
  }
}
