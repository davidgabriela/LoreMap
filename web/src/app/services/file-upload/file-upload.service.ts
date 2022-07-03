import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = 'http://localhost:5000/api/v1/maps';

  constructor(private http: HttpClient) {}

  upload(file: File, loreId: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageFile', file);
    formData.append('mapData', 'Some map data...');
    formData.append('lore', loreId);

    console.log('create map with:', formData);

    return this.http.post(`${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
