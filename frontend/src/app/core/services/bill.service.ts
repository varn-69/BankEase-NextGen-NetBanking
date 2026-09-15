import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill, BillPaymentRequest, TransactionDTO } from '../models/bill.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/bills`);
  }

  getBillById(billId: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/bills/${billId}`);
  }

  payBill(request: BillPaymentRequest): Observable<TransactionDTO> {
    return this.http.post<TransactionDTO>(`${this.apiUrl}/bills/pay`, request);
  }
}
