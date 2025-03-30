import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public userSignup(user: any): Observable<any> {
    return this.http.post('http://localhost:8000/signup', user)
  }
}
