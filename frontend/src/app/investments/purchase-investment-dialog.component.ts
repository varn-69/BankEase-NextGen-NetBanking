import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountDTO } from '../core/models/account.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestmentRequest } from '../core/models/investment.models';

@Component({
  selector: 'app-purchase-investment-dialog',
  template: `
    <h2 mat-dialog-title>Purchase Investment</h2>
    <mat-dialog-content>
      <form [formGroup]="investmentForm" class="investment-form">
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
          <mat-label>Investment Type</mat-label>
          <mat-select formControlName="investmentType" required>
            <mat-option value="Mutual Fund">Mutual Fund</mat-option>
            <mat-option value="Fixed Deposit">Fixed Deposit</mat-option>
            <mat-option value="Stocks">Stocks</mat-option>
            <mat-option value="Bonds">Bonds</mat-option>
            <mat-option value="Gold">Gold</mat-option>
          </mat-select>
          <mat-error>Please select an investment type</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Product Name</mat-label>
          <input matInput formControlName="productName" required maxlength="100">
          <mat-error>Product name is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Investment Amount (₹)</mat-label>
          <input matInput type="number" formControlName="amount" required min="1000" step="100">
          <mat-error>
            <span *ngIf="investmentForm.get('amount')?.hasError('required')">Amount is required</span>
            <span *ngIf="investmentForm.get('amount')?.hasError('min')">Minimum amount is ₹1,000</span>
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Transaction PIN</mat-label>
          <input matInput type="password" formControlName="transactionPin" required maxlength="6">
          <mat-error>
            <span *ngIf="investmentForm.get('transactionPin')?.hasError('required')">Transaction PIN is required</span>
            <span *ngIf="investmentForm.get('transactionPin')?.hasError('minlength')">PIN must be at least 4 digits</span>
          </mat-error>
        </mat-form-field>

        <div class="investment-summary" *ngIf="investmentForm.valid">
          <p><strong>Investment Type:</strong> {{ investmentForm.value.investmentType }}</p>
          <p><strong>Product:</strong> {{ investmentForm.value.productName }}</p>
          <p><strong>Amount:</strong> {{ formatCurrency(investmentForm.value.amount) }}</p>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onConfirm()" [disabled]="investmentForm.invalid">
        Purchase Investment
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .investment-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .full-width {
      width: 100%;
    }
    .investment-summary {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      margin-top: 16px;
    }
    .investment-summary p {
      margin: 8px 0;
    }
  `]
})
export class PurchaseInvestmentDialogComponent {
  investmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PurchaseInvestmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accounts: AccountDTO[] },
    private fb: FormBuilder
  ) {
    this.investmentForm = this.fb.group({
      accountId: ['', Validators.required],
      investmentType: ['', Validators.required],
      productName: ['', [Validators.required, Validators.maxLength(100)]],
      amount: ['', [Validators.required, Validators.min(1000)]],
      transactionPin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.investmentForm.valid) {
      const request: InvestmentRequest = {
        accountId: this.investmentForm.value.accountId,
        investmentType: this.investmentForm.value.investmentType,
        productName: this.investmentForm.value.productName,
        amount: this.investmentForm.value.amount,
        transactionPin: this.investmentForm.value.transactionPin
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
}