export interface LoanDTO {
  id: number;
  loanType: string;
  principal: number;
  interestRate: number;
  tenureMonths: number;
  emi: number;
  outstandingAmount: number;
  status: string;
  appliedAt: string;
  approvedAt?: string;
}

export interface LoanApplicationRequest {
  loanType: string;
  principal: number;
  tenureMonths: number;
}
