import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../core/services/transfer.service';
import { AccountService } from '../core/services/account.service';
import { BeneficiaryService } from '../core/services/beneficiary.service';
import { AccountDTO } from '../core/models/account.models';
import { BeneficiaryDTO } from '../core/models/beneficiary.models';
import { TransferRequest } from '../core/models/transaction.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TransferConfirmationDialogComponent } from './transfer-confirmation-dialog.component';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  transferForm: FormGroup;
  accounts: AccountDTO[] = [];
  beneficiaries: BeneficiaryDTO[] = [];
  loading = true;
  submitting = false;
  manualAccountMode = false;

  constructor(
    private fb: FormBuilder,
    private transferService: TransferService,
    private accountService: AccountService,
    private beneficiaryService: BeneficiaryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.transferForm = this.fb.group({
      fromAccountId: ['', [Validators.required]],
      toAccountId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]],
      transactionPin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Failed to load accounts', 'Close', { duration: 5000 });
      }
    });

    this.beneficiaryService.getBeneficiaries().subscribe({
      next: (beneficiaries) => {
        this.beneficiaries = beneficiaries;
      },
      error: (err) => {
        console.error('Failed to load beneficiaries:', err);
      }
    });
  }

  toggleManualAccountMode(): void {
    this.manualAccountMode = !this.manualAccountMode;
    this.transferForm.patchValue({ toAccountId: '' });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(TransferConfirmationDialogComponent, {
      width: '400px',
      data: {
        fromAccount: this.accounts.find(a => a.id === this.transferForm.value.fromAccountId),
        toAccount: this.manualAccountMode ? 
          this.transferForm.value.toAccountId : 
          this.beneficiaries.find(b => b.id === this.transferForm.value.toAccountId),
        amount: this.transferForm.value.amount,
        description: this.transferForm.value.description
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.executeTransfer();
      }
    });
  }

  executeTransfer(): void {
    this.submitting = true;
    const request: TransferRequest = {
      fromAccountId: this.transferForm.value.fromAccountId,
      toAccountId: this.manualAccountMode ? 
        parseInt(this.transferForm.value.toAccountId) : 
        this.transferForm.value.toAccountId,
      amount: this.transferForm.value.amount,
      transactionPin: this.transferForm.value.transactionPin,
      description: this.transferForm.value.description
    };

    this.transferService.initiateTransfer(request).subscribe({
      next: (transaction) => {
        this.submitting = false;
        this.snackBar.open('Transfer successful!', 'Close', { duration: 3000 });
        this.transferForm.reset();
        this.loadData();
      },
      error: (err) => {
        this.submitting = false;
        const message = err.error?.message || 'Transfer failed. Please try again.';
        this.snackBar.open(message, 'Close', { duration: 5000 });
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  }
}
