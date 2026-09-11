export interface Beneficiary {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  status: string;
}

export interface CreateBeneficiaryRequest {
  name: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
}
