import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvestmentDTO, InvestmentRequest } from '../models/investment.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getInvestments(): Observable<InvestmentDTO[]> {
    return this.http.get<InvestmentDTO[]>(`${this.apiUrl}/investments`);
  }

  getPortfolioValue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/investments/portfolio/value`);
  }

  purchaseInvestment(request: InvestmentRequest): Observable<InvestmentDTO> {
    return this.http.post<InvestmentDTO>(`${this.apiUrl}/investments`, request);
  }
}
