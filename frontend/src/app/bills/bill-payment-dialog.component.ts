import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bill, BillPaymentRequest } from '../core/models/bill.models';
import { AccountDTO } from '../core/models/account.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-payment-dialog',
  template: `
    <h2 mat-dialog-title>Pay Bill</h2>
    <mat-dialog-content>
      <div class="bill-details">
        <p><strong>Biller:</strong> {{ data.bill.biller }}</p>
        <p><strong>Category:</strong> {{ data.bill.category }}</p>
        <p><strong>Amount:</strong> {{ formatCurrency(data.bill.amount) }}</p>
        <p><strong>Due Date:</strong> {{ formatDate(data.bill.dueDate) }}</p>
      </div>

      <form [formGroup]="paymentForm" class="payment-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Select Account</mat-label>
          <mat-select formControlName="accountId" required>
            <mat-option *ngFor="let account of data.accounts" [value]="account.id">
              {{ account.accountNumber }} - {{ account.accountType }} ({{ formatCurrency(account.balance) }})
            </mat-option>
          </mat-select>
          <mat-error>Please select an account</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Transaction PIN</mat-label>
          <input matInput type="password" formControlName="transactionPin" required maxlength="6">
          <mat-error>
            <span *ngIf="paymentForm.get('transactionPin')?.hasError('required')">Transaction PIN is required</span>
            <span *ngIf="paymentForm.get('transactionPin')?.hasError('minlength')">PIN must be at least 4 digits</span>
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onConfirm()" [disabled]="paymentForm.invalid">
        Pay {{ formatCurrency(data.bill.amount) }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .bill-details {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .bill-details p {
      margin: 8px 0;
    }
    .payment-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .full-width {
      width: 100%;
    }
  `]
})
export class BillPaymentDialogComponent {
  paymentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BillPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bill: Bill; accounts: AccountDTO[] },
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      accountId: ['', Validators.required],
      transactionPin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.paymentForm.valid) {
      const request: BillPaymentRequest = {
        billId: this.data.bill.id,
        accountId: this.paymentForm.value.accountId,
        transactionPin: this.paymentForm.value.transactionPin
      };
      this.dialogRef.close(request);
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