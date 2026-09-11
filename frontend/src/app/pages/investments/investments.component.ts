import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentService } from '../../services/investment.service';
import { Investment } from '../../models/investment.model';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  investments: Investment[] = [];
  portfolioValue: number = 0;
  loading = true;
  error: string | null = null;

  constructor(private investmentService: InvestmentService) {}

  ngOnInit(): void {
    this.loadInvestments();
    this.loadPortfolioValue();
  }

  loadInvestments(): void {
    this.investmentService.getMyInvestments().subscribe({
      next: (data) => {
        this.investments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load investments';
        this.loading = false;
      }
    });
  }

  loadPortfolioValue(): void {
    this.investmentService.getPortfolioValue().subscribe({
      next: (value) => {
        this.portfolioValue = value;
      },
      error: (err) => {
        console.error('Failed to load portfolio value', err);
      }
    });
  }
}
