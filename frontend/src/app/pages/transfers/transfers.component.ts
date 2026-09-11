import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  accounts: Account[] = [];
  transferForm: FormGroup;
  loading = true;
  submitting = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.transferForm = this.fb.group({
      fromAccountId: ['', Validators.required],
      toAccountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      transactionPin: ['', [Validators.required, Validators.minLength(4)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getMyAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load accounts';
        this.loading = false;
      }
    });
  }

  initiateTransfer(): void {
    if (this.transferForm.valid && this.transferForm.get('fromAccountId')?.value !== this.transferForm.get('toAccountId')?.value) {
      this.submitting = true;
      this.error = null;
      this.success = null;

      this.accountService.initiateTransfer(this.transferForm.value).subscribe({
        next: (response) => {
          this.success = `Transfer successful! Reference: ${response.transactionReference}`;
          this.transferForm.reset();
          this.submitting = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Transfer failed';
          this.submitting = false;
        }
      });
    } else if (this.transferForm.get('fromAccountId')?.value === this.transferForm.get('toAccountId')?.value) {
      this.error = 'From and To accounts cannot be the same';
    }
  }
}
