export interface BeneficiaryDTO {
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
