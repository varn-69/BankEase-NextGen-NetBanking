import { Component, OnInit } from '@angular/core';
import { InvestmentService } from '../core/services/investment.service';
import { AccountService } from '../core/services/account.service';
import { InvestmentDTO, InvestmentRequest } from '../core/models/investment.models';
import { AccountDTO } from '../core/models/account.models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseInvestmentDialogComponent } from './purchase-investment-dialog.component';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  investments: InvestmentDTO[] = [];
  accounts: AccountDTO[] = [];
  portfolioValue: number = 0;
  loading = true;
  error: string | null = null;

  constructor(
    private investmentService: InvestmentService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInvestments();
    this.loadAccounts();
    this.loadPortfolioValue();
  }

  loadInvestments(): void {
    this.loading = true;
    this.error = null;
    this.investmentService.getInvestments().subscribe({
      next: (data) => {
        this.investments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load investments. Please try again.';
        this.loading = false;
        console.error('Error loading investments:', err);
      }
    });
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.error('Error loading accounts:', err);
      }
    });
  }

  loadPortfolioValue(): void {
    this.investmentService.getPortfolioValue().subscribe({
      next: (value) => {
        this.portfolioValue = value;
      },
      error: (err) => {
        console.error('Error loading portfolio value:', err);
      }
    });
  }

  openPurchaseDialog(): void {
    if (this.accounts.length === 0) {
      this.snackBar.open('No accounts available. Please create an account first.', 'Close', {
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(PurchaseInvestmentDialogComponent, {
      width: '500px',
      data: {
        accounts: this.accounts
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.purchaseInvestment(result);
      }
    });
  }

  purchaseInvestment(request: InvestmentRequest): void {
    this.investmentService.purchaseInvestment(request).subscribe({
      next: (investment) => {
        this.snackBar.open('Investment purchased successfully!', 'Close', {
          duration: 3000
        });
        this.loadInvestments();
        this.loadPortfolioValue();
        this.loadAccounts();
      },
      error: (err) => {
        this.snackBar.open('Failed to purchase investment. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Error purchasing investment:', err);
      }
    });
  }

  calculateReturns(investment: InvestmentDTO): number {
    if (!investment.currentValue || !investment.amountInvested) return 0;
    return investment.currentValue - investment.amountInvested;
  }

  calculateReturnsPercentage(investment: InvestmentDTO): number {
    if (!investment.currentValue || !investment.amountInvested) return 0;
    return ((investment.currentValue - investment.amountInvested) / investment.amountInvested) * 100;
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
