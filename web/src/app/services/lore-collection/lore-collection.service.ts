import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs';
import {
  map,
  mergeMap
} from 'rxjs/operators';
import { Lore } from 'src/app/models/Lore';
import { User } from 'src/app/models/User';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoreCollectionService {
  constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService) { }

  user: User | null = null;
  private loresUrl = 'http://localhost:5000/api/v1/lore-collection';

  getLores(): Observable<Lore[]> {
    return this.authService.getCurrentUser().pipe(
      mergeMap((res: User) => this.http.get(this.loresUrl + `?owner=${res._id}`)
        .pipe(
          map((data: any) => data.data)
        )
      )
    );
  }

  getLore(id: string): Observable<Lore> {
    return this.http.get(this.loresUrl + `/${id}`).pipe(map((data: any) => data.data))
  }

  addLore(lore: Lore): Observable<any> {
    let header = new HttpHeaders().set('Content-type', 'application/json');
    let options = {
      headers: header,
    };
    return this.http.post(this.loresUrl, lore, options);
  }

  removeLore(id: string): Observable<any> {
    return this.http.delete(this.loresUrl + `/${id}`);
  }

  updateLore(id: string, htmlContent: string): Observable<any> {
    console.log("update with:", htmlContent);
    const body = {
      content: htmlContent
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('token')}`,
    });

    let options = {headers};
    return this.http.put(this.loresUrl+`/${id}`, body, options);
  }
}
