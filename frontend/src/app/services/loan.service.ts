import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan, LoanApplicationRequest } from '../models/loan.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = `${environment.apiUrl}/loans`;

  constructor(private http: HttpClient) {}

  applyForLoan(request: LoanApplicationRequest): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/apply`, request);
  }

  getMyLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  getLoanById(loanId: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${loanId}`);
  }

  approveLoan(loanId: number): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/${loanId}/approve`, null);
  }

  rejectLoan(loanId: number): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/${loanId}/reject`, null);
  }
}
