import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private http: HttpClient, private authService: AuthService) { }

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
}
