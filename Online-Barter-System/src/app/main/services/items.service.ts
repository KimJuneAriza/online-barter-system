import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl = 'http://localhost:8000/add-item';

  constructor(private http: HttpClient) { }

  addItem(itemData: any): Observable<any> {
    return this.http.post(this.apiUrl, itemData);
  }
  

}
