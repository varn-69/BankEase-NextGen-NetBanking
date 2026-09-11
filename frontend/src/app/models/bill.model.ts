export interface Bill {
  id: number;
  billerId: number;
  biller: string;
  amount: number;
  dueDate: Date;
  status: string;
  description?: string;
}

export interface BillPaymentRequest {
  billId: number;
  accountId: number;
  transactionPin: string;
}
