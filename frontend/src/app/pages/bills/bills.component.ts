import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill.model';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  loading = true;
  error: string | null = null;

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.billService.getMyBills().subscribe({
      next: (data) => {
        this.bills = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load bills';
        this.loading = false;
      }
    });
  }

  payBill(billId: number): void {
    // TODO: Implement bill payment modal
  }
}
