import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Folder } from 'src/app/models/Folder';

@Injectable({
  providedIn: 'root',
})
export class FoldersService {
  constructor(private http: HttpClient) {}

  getFoldersFromLore(loreId: string): Observable<Folder[]> {
    const documentsUrl = `http://localhost:5000/api/v1/lore-collection/${loreId}/folders/`;
    return this.http.get(documentsUrl).pipe(map((data: any) => data.data));
  }
  createFolder(folder: Folder) {
    const createUrl = 'http://localhost:5000/api/v1/folders';
    return this.http.post(createUrl, folder);
  }
}
