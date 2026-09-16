import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-beneficiary-dialog',
  template: `
    <h2 mat-dialog-title>Add New Beneficiary</h2>
    <mat-dialog-content>
      <form [formGroup]="beneficiaryForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Beneficiary Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter beneficiary name">
          <mat-error *ngIf="beneficiaryForm.get('name')?.hasError('required')">
            Beneficiary name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Account Number</mat-label>
          <input matInput formControlName="accountNumber" placeholder="Enter account number">
          <mat-error *ngIf="beneficiaryForm.get('accountNumber')?.hasError('required')">
            Account number is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Bank Name</mat-label>
          <input matInput formControlName="bankName" placeholder="Enter bank name">
          <mat-error *ngIf="beneficiaryForm.get('bankName')?.hasError('required')">
            Bank name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>IFSC Code</mat-label>
          <input matInput formControlName="ifsc" placeholder="Enter IFSC code (e.g., SBIN0001234)">
          <mat-error *ngIf="beneficiaryForm.get('ifsc')?.hasError('required')">
            IFSC code is required
          </mat-error>
          <mat-error *ngIf="beneficiaryForm.get('ifsc')?.hasError('pattern')">
            Invalid IFSC code format
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onAdd()" [disabled]="beneficiaryForm.invalid">
        Add Beneficiary
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
export class AddBeneficiaryDialogComponent {
  beneficiaryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBeneficiaryDialogComponent>
  ) {
    this.beneficiaryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9,18}$/)]],
      bankName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      ifsc: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.beneficiaryForm.valid) {
      this.dialogRef.close(this.beneficiaryForm.value);
    }
  }
}