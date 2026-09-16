import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-account-dialog',
  template: `
    <h2 mat-dialog-title>Create New Account</h2>
    <mat-dialog-content>
      <form [formGroup]="createAccountForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Account Type</mat-label>
          <mat-select formControlName="accountType">
            <mat-option value="SAVINGS">Savings Account</mat-option>
            <mat-option value="CURRENT">Current Account</mat-option>
          </mat-select>
          <mat-error *ngIf="createAccountForm.get('accountType')?.hasError('required')">
            Account type is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Initial Balance</mat-label>
          <input matInput type="number" formControlName="initialBalance" placeholder="Enter initial balance">
          <mat-error *ngIf="createAccountForm.get('initialBalance')?.hasError('required')">
            Initial balance is required
          </mat-error>
          <mat-error *ngIf="createAccountForm.get('initialBalance')?.hasError('min')">
            Initial balance must be at least ₹100
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onCreate()" [disabled]="createAccountForm.invalid">
        Create Account
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class CreateAccountDialogComponent {
  createAccountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>
  ) {
    this.createAccountForm = this.fb.group({
      accountType: ['SAVINGS', [Validators.required]],
      initialBalance: [1000, [Validators.required, Validators.min(100)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.createAccountForm.valid) {
      this.dialogRef.close(this.createAccountForm.value);
    }
  }
}