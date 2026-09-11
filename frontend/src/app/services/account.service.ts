import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, TransferRequest, Transaction } from '../models/account.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/accounts`;
  private transferUrl = `${environment.apiUrl}/transfers`;

  constructor(private http: HttpClient) {}

  getMyAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccountById(accountId: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${accountId}`);
  }

  createAccount(accountType: string, initialBalance: number): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/create`, null, {
      params: { accountType, initialBalance: initialBalance.toString() }
    });
  }

  initiateTransfer(request: TransferRequest): Observable<Transaction> {
    return this.http.post<Transaction>(this.transferUrl, request);
  }
}
