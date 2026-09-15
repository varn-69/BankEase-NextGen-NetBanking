import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BeneficiaryDTO, CreateBeneficiaryRequest } from '../models/beneficiary.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBeneficiaries(): Observable<BeneficiaryDTO[]> {
    return this.http.get<BeneficiaryDTO[]>(`${this.apiUrl}/beneficiaries`);
  }

  addBeneficiary(request: CreateBeneficiaryRequest): Observable<BeneficiaryDTO> {
    return this.http.post<BeneficiaryDTO>(`${this.apiUrl}/beneficiaries`, request);
  }

  deleteBeneficiary(beneficiaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/beneficiaries/${beneficiaryId}`);
  }
}
