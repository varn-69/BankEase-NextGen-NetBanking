export interface Account {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  status: string;
}

export interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  transactionPin: string;
  description?: string;
}

export interface Transaction {
  id: number;
  transactionReference: string;
  amount: number;
  transactionType: string;
  status: string;
  description: string;
  createdAt: Date;
}
