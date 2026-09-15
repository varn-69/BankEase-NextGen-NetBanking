export interface TransactionDTO {
  id: number;
  transactionReference: string;
  amount: number;
  transactionType: string;
  status: string;
  description: string;
  createdAt: string;
}

export interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  transactionPin: string;
  description?: string;
}
