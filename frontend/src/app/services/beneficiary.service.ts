import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiary, CreateBeneficiaryRequest } from '../models/beneficiary.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private apiUrl = `${environment.apiUrl}/beneficiaries`;

  constructor(private http: HttpClient) {}

  getMyBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(this.apiUrl);
  }

  addBeneficiary(request: CreateBeneficiaryRequest): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(this.apiUrl, request);
  }

  deleteBeneficiary(beneficiaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${beneficiaryId}`);
  }
}
