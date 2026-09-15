export interface Bill {
  id: number;
  biller: string;
  category: string;
  consumerNumber: string;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
}

export interface BillPaymentRequest {
  billId: number;
  accountId: number;
  transactionPin: string;
}
