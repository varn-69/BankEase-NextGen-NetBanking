import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Logout</h2>
    <mat-dialog-content>
      <p>Are you sure you want to logout?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Logout</button>
    </mat-dialog-actions>
  `
})
export class LogoutConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}