import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/auth.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  deactivateUser(userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/deactivate`, null);
  }

  activateUser(userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/activate`, null);
  }
}
