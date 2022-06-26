import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from 'src/app/models/Document';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  getDocumentsFromLore(loreId: string): Observable<Document[]> {
    const documentsUrl = `http://lore-map.herokuapp.com/api/v1/lore-collection/${loreId}/documents/`;
    return this.http.get(documentsUrl).pipe(map((data: any) => data.data));
  }

  getDocumentById(loreId: string, documentId: string): Observable<Document> {
    const documentUrl = `http://lore-map.herokuapp.com/api/v1/lore-collection/${loreId}/documents/${documentId}`;
    return this.http.get(documentUrl).pipe(map((data: any) => data.data));
  }
  createDocument(document: Document) {
    const createUrl = 'http://lore-map.herokuapp.com/api/v1/documents';
    return this.http.post(createUrl, document);
  }
  updateDocument(id: string, htmlContent: string) {
    const updateUrl = `http://lore-map.herokuapp.com/api/v1/documents/${id}`;
    const body = {
      content: htmlContent,
    };
    return this.http.put(updateUrl, body);
  }
}
