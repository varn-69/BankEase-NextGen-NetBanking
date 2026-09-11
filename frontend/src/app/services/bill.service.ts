import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill, BillPaymentRequest } from '../models/bill.model';
import { Transaction } from '../models/account.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = `${environment.apiUrl}/bills`;

  constructor(private http: HttpClient) {}

  getMyBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }

  getBillById(billId: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${billId}`);
  }

  payBill(request: BillPaymentRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/pay`, request);
  }
}
