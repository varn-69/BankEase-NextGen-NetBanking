import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  loading = true;
  error: string | null = null;
  showCreateForm = false;
  createForm: FormGroup;

  accountTypes = ['SAVINGS', 'CURRENT', 'SALARY', 'OVERDRAFT'];

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      accountType: ['SAVINGS', Validators.required],
      initialBalance: ['0', [Validators.required, Validators.min(0)]]
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

  createAccount(): void {
    if (this.createForm.valid) {
      const { accountType, initialBalance } = this.createForm.value;
      this.accountService.createAccount(accountType, parseFloat(initialBalance)).subscribe({
        next: (account) => {
          this.accounts.push(account);
          this.showCreateForm = false;
          this.createForm.reset({ accountType: 'SAVINGS', initialBalance: '0' });
        },
        error: (err) => {
          this.error = 'Failed to create account';
        }
      });
    }
  }
}
