import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDTO, CreateAccountRequest } from '../models/account.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<AccountDTO[]> {
    return this.http.get<AccountDTO[]>(`${this.apiUrl}/accounts`);
  }

  getAccountById(accountId: number): Observable<AccountDTO> {
    return this.http.get<AccountDTO>(`${this.apiUrl}/accounts/${accountId}`);
  }

  createAccount(request: CreateAccountRequest): Observable<AccountDTO> {
    const params = new URLSearchParams();
    params.append('accountType', request.accountType);
    params.append('initialBalance', request.initialBalance.toString());
    
    return this.http.post<AccountDTO>(`${this.apiUrl}/accounts/create?${params.toString()}`, {});
  }
}
