export interface InvestmentDTO {
  id: number;
  investmentType: string;
  productName: string;
  amountInvested: number;
  units: number;
  purchasePrice: number;
  currentValue: number;
  createdAt: string;
}

export interface InvestmentRequest {
  accountId: number;
  investmentType: string;
  productName: string;
  amount: number;
  transactionPin: string;
}
