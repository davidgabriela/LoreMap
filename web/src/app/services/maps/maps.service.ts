import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Map } from 'src/app/models/Map';
@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor(private http: HttpClient) {}

  getMap(loreId: string, mapId: string): Observable<Map> {
    const mapsUrl = `http://lore-map.herokuapp.com/api/v1/lore-collection/${loreId}/maps/${mapId}`;
    return this.http.get(mapsUrl).pipe(map((data: any) => data.data));
  }
  updateMap(mapId: string, data: any) {
    const updateUrl = `http://localhost:5000/api/v1/maps/${mapId}`;
    const body = {
      mapData: data,
    };
    return this.http.put(updateUrl, body);
  }
}
