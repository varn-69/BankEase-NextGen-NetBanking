import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment, InvestmentRequest } from '../models/investment.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private apiUrl = `${environment.apiUrl}/investments`;

  constructor(private http: HttpClient) {}

  purchaseInvestment(request: InvestmentRequest): Observable<Investment> {
    return this.http.post<Investment>(this.apiUrl, request);
  }

  getMyInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(this.apiUrl);
  }

  getPortfolioValue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/portfolio/value`);
  }
}
