import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  loans: Loan[] = [];
  loanForm: FormGroup;
  loading = true;
  submitting = false;
  error: string | null = null;
  success: string | null = null;
  showForm = false;

  loanTypes = ['PERSONAL', 'EDUCATION', 'HOME', 'VEHICLE', 'BUSINESS'];

  constructor(
    private loanService: LoanService,
    private fb: FormBuilder
  ) {
    this.loanForm = this.fb.group({
      loanType: ['PERSONAL', Validators.required],
      principal: ['', [Validators.required, Validators.min(10000)]],
      tenureMonths: ['12', [Validators.required, Validators.min(6)]]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getMyLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load loans';
        this.loading = false;
      }
    });
  }

  applyForLoan(): void {
    if (this.loanForm.valid) {
      this.submitting = true;
      this.error = null;
      this.success = null;

      this.loanService.applyForLoan(this.loanForm.value).subscribe({
        next: (loan) => {
          this.loans.push(loan);
          this.success = 'Loan application submitted successfully';
          this.loanForm.reset({ loanType: 'PERSONAL', tenureMonths: '12' });
          this.showForm = false;
          this.submitting = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to apply for loan';
          this.submitting = false;
        }
      });
    }
  }
}
