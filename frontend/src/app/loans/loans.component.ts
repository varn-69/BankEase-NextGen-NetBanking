import { Component, OnInit } from '@angular/core';
import { LoanService } from '../core/services/loan.service';
import { LoanDTO, LoanApplicationRequest } from '../core/models/loan.models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanApplicationDialogComponent } from './loan-application-dialog.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  loans: LoanDTO[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private loanService: LoanService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loading = true;
    this.error = null;
    this.loanService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load loans. Please try again.';
        this.loading = false;
        console.error('Error loading loans:', err);
      }
    });
  }

  openApplicationDialog(): void {
    const dialogRef = this.dialog.open(LoanApplicationDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applyForLoan(result);
      }
    });
  }

  applyForLoan(request: LoanApplicationRequest): void {
    this.loanService.applyForLoan(request).subscribe({
      next: (loan) => {
        this.snackBar.open('Loan application submitted successfully!', 'Close', {
          duration: 3000
        });
        this.loadLoans();
      },
      error: (err) => {
        this.snackBar.open('Failed to submit loan application. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Error applying for loan:', err);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'green';
      case 'PENDING':
        return 'orange';
      case 'REJECTED':
        return 'red';
      case 'PAID':
        return 'blue';
      default:
        return 'gray';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
