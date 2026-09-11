export interface Loan {
  id: number;
  loanType: string;
  principal: number;
  interestRate: number;
  tenureMonths: number;
  emi: number;
  outstandingAmount: number;
  status: string;
  appliedAt: Date;
  approvedAt?: Date;
}

export interface LoanApplicationRequest {
  loanType: string;
  principal: number;
  tenureMonths: number;
}
