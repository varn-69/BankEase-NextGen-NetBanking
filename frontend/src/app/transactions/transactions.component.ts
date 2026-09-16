import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../core/services/transaction.service';
import { TransactionDTO } from '../core/models/transaction.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: TransactionDTO[] = [];
  loading = true;
  error: string | null = null;
  displayedColumns: string[] = ['transactionReference', 'transactionType', 'amount', 'status', 'createdAt'];

  constructor(
    private transactionService: TransactionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    this.error = null;
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load transactions. Please try again.';
        console.error('Error loading transactions:', err);
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'SUCCESS':
        return 'green';
      case 'FAILED':
        return 'red';
      case 'PENDING':
        return 'orange';
      case 'REVERSED':
        return 'purple';
      default:
        return 'gray';
    }
  }

  getTransactionTypeIcon(type: string): string {
    switch (type) {
      case 'TRANSFER':
        return 'send';
      case 'BILL_PAYMENT':
        return 'receipt';
      case 'LOAN_DISBURSEMENT':
        return 'account_balance';
      case 'LOAN_REPAYMENT':
        return 'payments';
      case 'INVESTMENT':
        return 'trending_up';
      case 'DEPOSIT':
        return 'add_circle';
      case 'WITHDRAWAL':
        return 'remove_circle';
      default:
        return 'receipt_long';
    }
  }
}
