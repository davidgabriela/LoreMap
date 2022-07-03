import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Map } from 'src/app/models/Map';
@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor(private http: HttpClient) {}
  baseUrl = `http://localhost:5000/api/v1/lore-collection`;
  mapsUrl = `http://localhost:5000/api/v1/maps`;

  getMaps(loreId: string): Observable<Map[]> {
    return this.http
      .get(`${this.baseUrl}/${loreId}/maps`)
      .pipe(map((data: any) => data.data));
  }

  getMap(loreId: string, mapId: string): Observable<Map> {
    return this.http
      .get(`${this.baseUrl}/${loreId}/maps/${mapId}`)
      .pipe(map((data: any) => data.data));
  }

  addMap(obj: Map): Observable<Map[]> {
    return this.http
      .post(this.mapsUrl, obj)
      .pipe(map((data: any) => data.data));
  }

  removeMap(id: string) {
    return this.http.delete(`${this.mapsUrl}/${id}`);
  }

  updateMap(mapId: string, data: any) {
    const updateUrl = `${this.mapsUrl}/${mapId}`;
    const body = {
      mapData: data,
    };
    console.log('UPDATEEEEE', updateUrl, body);
    return this.http.put(updateUrl, body);
  }

  upload(file: File, loreId: string, name: string): Observable<any> {
    console.log('UPLOAD?', file, loreId);
    let formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('imageFile', file);
    formData.append('mapData', '');
    formData.append('lore', loreId);

    return this.http.post(`${this.mapsUrl}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.mapsUrl}`);
  }
}
