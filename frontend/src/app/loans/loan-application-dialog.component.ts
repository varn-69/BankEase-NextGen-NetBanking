import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanApplicationRequest } from '../core/models/loan.models';

@Component({
  selector: 'app-loan-application-dialog',
  template: `
    <h2 mat-dialog-title>Apply for Loan</h2>
    <mat-dialog-content>
      <form [formGroup]="loanForm" class="loan-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Loan Type</mat-label>
          <mat-select formControlName="loanType" required>
            <mat-option value="Personal Loan">Personal Loan</mat-option>
            <mat-option value="Home Loan">Home Loan</mat-option>
            <mat-option value="Car Loan">Car Loan</mat-option>
            <mat-option value="Education Loan">Education Loan</mat-option>
            <mat-option value="Business Loan">Business Loan</mat-option>
          </mat-select>
          <mat-error>Please select a loan type</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Principal Amount (₹)</mat-label>
          <input matInput type="number" formControlName="principal" required min="10000" step="1000">
          <mat-error>
            <span *ngIf="loanForm.get('principal')?.hasError('required')">Principal amount is required</span>
            <span *ngIf="loanForm.get('principal')?.hasError('min')">Minimum amount is ₹10,000</span>
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Tenure (Months)</mat-label>
          <input matInput type="number" formControlName="tenureMonths" required min="6" max="360">
          <mat-error>
            <span *ngIf="loanForm.get('tenureMonths')?.hasError('required')">Tenure is required</span>
            <span *ngIf="loanForm.get('tenureMonths')?.hasError('min')">Minimum tenure is 6 months</span>
            <span *ngIf="loanForm.get('tenureMonths')?.hasError('max')">Maximum tenure is 360 months</span>
          </mat-error>
        </mat-form-field>

        <div class="loan-summary" *ngIf="loanForm.valid">
          <p><strong>Loan Type:</strong> {{ loanForm.value.loanType }}</p>
          <p><strong>Principal:</strong> {{ formatCurrency(loanForm.value.principal) }}</p>
          <p><strong>Tenure:</strong> {{ loanForm.value.tenureMonths }} months</p>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onConfirm()" [disabled]="loanForm.invalid">
        Submit Application
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .loan-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .full-width {
      width: 100%;
    }
    .loan-summary {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      margin-top: 16px;
    }
    .loan-summary p {
      margin: 8px 0;
    }
  `]
})
export class LoanApplicationDialogComponent {
  loanForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoanApplicationDialogComponent>,
    private fb: FormBuilder
  ) {
    this.loanForm = this.fb.group({
      loanType: ['', Validators.required],
      principal: ['', [Validators.required, Validators.min(10000)]],
      tenureMonths: ['', [Validators.required, Validators.min(6), Validators.max(360)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.loanForm.valid) {
      const request: LoanApplicationRequest = {
        loanType: this.loanForm.value.loanType,
        principal: this.loanForm.value.principal,
        tenureMonths: this.loanForm.value.tenureMonths
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