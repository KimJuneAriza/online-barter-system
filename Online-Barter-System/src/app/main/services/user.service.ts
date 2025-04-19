import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  public userSignup(user: any): Observable<any> {
    return this.http.post('http://localhost:8000/signup', user)
  }

  public userSignin(credentials: any): Observable<any> {
    return this.http.post('http://localhost:8000/signin', credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
      localStorage.setItem('token', res.token); // Optional: for API auth
        this.currentUserSubject.next(res.user)
      })
    );
  }

  private apiUrl = 'http://localhost:8000';
  getProfileByUserId(userId: number) {
    return this.http.post<any>(`${this.apiUrl}/profile/fetch`, { user_id: userId });
  }
  

  public completeProfile(profileData: FormData): Observable<any> {
    return this.http.post('http://localhost:8000/profile', profileData);
  }

  getStoredUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    
  }
}
