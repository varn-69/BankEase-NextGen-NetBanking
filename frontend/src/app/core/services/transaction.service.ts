import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionDTO } from '../models/transaction.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<TransactionDTO[]> {
    return this.http.get<TransactionDTO[]>(`${this.apiUrl}/transactions`);
  }

  getTransactionById(transactionId: number): Observable<TransactionDTO> {
    return this.http.get<TransactionDTO>(`${this.apiUrl}/transactions/${transactionId}`);
  }
}