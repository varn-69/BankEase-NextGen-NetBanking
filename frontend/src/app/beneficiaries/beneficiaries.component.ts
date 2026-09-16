import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiaryService } from '../core/services/beneficiary.service';
import { BeneficiaryDTO } from '../core/models/beneficiary.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddBeneficiaryDialogComponent } from './add-beneficiary-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
  beneficiaries: BeneficiaryDTO[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBeneficiaries();
  }

  loadBeneficiaries(): void {
    this.loading = true;
    this.error = null;
    this.beneficiaryService.getBeneficiaries().subscribe({
      next: (data) => {
        this.beneficiaries = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load beneficiaries. Please try again.';
        console.error('Error loading beneficiaries:', err);
      }
    });
  }

  openAddBeneficiaryDialog(): void {
    const dialogRef = this.dialog.open(AddBeneficiaryDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addBeneficiary(result);
      }
    });
  }

  addBeneficiary(request: any): void {
    this.beneficiaryService.addBeneficiary(request).subscribe({
      next: (newBeneficiary) => {
        this.snackBar.open('Beneficiary added successfully', 'Close', { duration: 3000 });
        this.loadBeneficiaries();
      },
      error: (err) => {
        const message = err.error?.message || 'Failed to add beneficiary. Please try again.';
        this.snackBar.open(message, 'Close', { duration: 5000 });
      }
    });
  }

  confirmDeleteBeneficiary(beneficiary: BeneficiaryDTO): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Beneficiary',
        message: `Are you sure you want to delete ${beneficiary.name} from your beneficiaries?`,
        itemName: beneficiary.name
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteBeneficiary(beneficiary.id);
      }
    });
  }

  deleteBeneficiary(beneficiaryId: number): void {
    this.beneficiaryService.deleteBeneficiary(beneficiaryId).subscribe({
      next: () => {
        this.snackBar.open('Beneficiary deleted successfully', 'Close', { duration: 3000 });
        this.loadBeneficiaries();
      },
      error: (err) => {
        const message = err.error?.message || 'Failed to delete beneficiary. Please try again.';
        this.snackBar.open(message, 'Close', { duration: 5000 });
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'INACTIVE':
        return 'orange';
      default:
        return 'gray';
    }
  }
}
