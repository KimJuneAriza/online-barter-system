import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private addItemUrl = 'http://localhost:8000/add-item';
  private getItemsUrl = 'http://localhost:8000/items';

  constructor(private http: HttpClient) { }

  addItem(itemData: FormData): Observable<any> {
    return this.http.post(this.addItemUrl, itemData);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.getItemsUrl);
  }

}
