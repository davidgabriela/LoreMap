import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Map } from 'src/app/models/Map';
@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor(private http: HttpClient) {}

  private mapsUrl = 'http://localhost:5000/api/v1/maps';

  getMap(id: string): Observable<Map> {
    return this.http
      .get(this.mapsUrl + `/${id}`)
      .pipe(map((data: any) => data.data));
  }
}
