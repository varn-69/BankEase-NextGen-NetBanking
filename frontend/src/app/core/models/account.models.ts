export interface AccountDTO {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  status: string;
}

export interface CreateAccountRequest {
  accountType: 'SAVINGS' | 'CURRENT';
  initialBalance: number;
}
