export interface TransactionDTO {
  id: number;
  transactionReference: string;
  amount: number;
  transactionType: string;
  status: string;
  description: string;
  createdAt: string; // Backend sends LocalDateTime, we'll parse as string
}

export interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  transactionPin: string;
  description?: string;
}
