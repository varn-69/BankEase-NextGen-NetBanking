import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Transfer</h2>
    <mat-dialog-content>
      <div class="confirmation-details">
        <div class="detail-row">
          <span class="label">From Account:</span>
          <span class="value">{{ data.fromAccount?.accountType }} - {{ data.fromAccount?.accountNumber }}</span>
        </div>
        <div class="detail-row">
          <span class="label">To Account:</span>
          <span class="value">{{ getDestinationAccount() }}</span>
        </div>
        <div class="detail-row">
          <span class="label">Amount:</span>
          <span class="value amount">{{ formatCurrency(data.amount) }}</span>
        </div>
        <div class="detail-row" *ngIf="data.description">
          <span class="label">Description:</span>
          <span class="value">{{ data.description }}</span>
        </div>
      </div>
      <p class="warning">This transaction cannot be undone. Are you sure you want to proceed?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">Confirm Transfer</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .confirmation-details {
      margin-bottom: 20px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .label {
        font-weight: 500;
        color: #666;
      }

      .value {
        font-weight: 600;
        color: #333;

        &.amount {
          color: #2e7d32;
          font-size: 1.1rem;
        }
      }
    }

    .warning {
      color: #f57c00;
      font-weight: 500;
      margin: 0;
      padding: 10px;
      background-color: #fff3e0;
      border-radius: 4px;
    }
  `]
})
export class TransferConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TransferConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getDestinationAccount(): string {
    if (this.data.toAccount?.accountNumber) {
      return `${this.data.toAccount.name} - ${this.data.toAccount.accountNumber}`;
    }
    return this.data.toAccount || 'Unknown Account';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}