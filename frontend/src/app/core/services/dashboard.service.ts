import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardDTO } from '../models/dashboard.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<DashboardDTO> {
    return this.http.get<DashboardDTO>(`${this.apiUrl}/dashboard`);
  }
}
