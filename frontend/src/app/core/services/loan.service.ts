import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanDTO, LoanApplicationRequest } from '../models/loan.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLoans(): Observable<LoanDTO[]> {
    return this.http.get<LoanDTO[]>(`${this.apiUrl}/loans`);
  }

  getLoanById(loanId: number): Observable<LoanDTO> {
    return this.http.get<LoanDTO>(`${this.apiUrl}/loans/${loanId}`);
  }

  applyForLoan(request: LoanApplicationRequest): Observable<LoanDTO> {
    return this.http.post<LoanDTO>(`${this.apiUrl}/loans/apply`, request);
  }
}
