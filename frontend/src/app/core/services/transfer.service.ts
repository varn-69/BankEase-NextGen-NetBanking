import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionDTO, TransferRequest } from '../models/transaction.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  initiateTransfer(request: TransferRequest): Observable<TransactionDTO> {
    return this.http.post<TransactionDTO>(`${this.apiUrl}/transfers`, request);
  }
}
