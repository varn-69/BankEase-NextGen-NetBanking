import { Component, OnInit } from '@angular/core';
import { BillService } from '../core/services/bill.service';
import { AccountService } from '../core/services/account.service';
import { Bill, BillPaymentRequest } from '../core/models/bill.models';
import { AccountDTO } from '../core/models/account.models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BillPaymentDialogComponent } from './bill-payment-dialog.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  accounts: AccountDTO[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private billService: BillService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBills();
    this.loadAccounts();
  }

  loadBills(): void {
    this.loading = true;
    this.error = null;
    this.billService.getBills().subscribe({
      next: (data) => {
        this.bills = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load bills. Please try again.';
        this.loading = false;
        console.error('Error loading bills:', err);
      }
    });
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.error('Error loading accounts:', err);
      }
    });
  }

  openPaymentDialog(bill: Bill): void {
    if (this.accounts.length === 0) {
      this.snackBar.open('No accounts available. Please create an account first.', 'Close', {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(BillPaymentDialogComponent, {
      width: '500px',
      data: {
        bill: bill,
        accounts: this.accounts
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.payBill(result);
      }
    });
  }

  payBill(request: BillPaymentRequest): void {
    this.billService.payBill(request).subscribe({
      next: (transaction) => {
        this.snackBar.open('Bill paid successfully!', 'Close', {
          duration: 3000
        });
        this.loadBills();
        this.loadAccounts();
      },
      error: (err) => {
        this.snackBar.open('Failed to pay bill. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Error paying bill:', err);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PAID':
        return 'green';
      case 'PENDING':
        return 'orange';
      case 'CANCELLED':
        return 'red';
      default:
        return 'gray';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
