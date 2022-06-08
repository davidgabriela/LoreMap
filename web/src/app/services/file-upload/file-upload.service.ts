import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = 'http://localhost:5000/api/v1/maps';

  constructor(private http: HttpClient) {}

  /**
   *
   * let header = new HttpHeaders().set('Content-type', 'application/json');
    let options = {
      headers: header,
    };
    return this.http.post(this.loresUrl, lore, options);
   */

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imageFile', file);
    formData.append('mapData', 'Some map data...');

    console.log(file);
    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
