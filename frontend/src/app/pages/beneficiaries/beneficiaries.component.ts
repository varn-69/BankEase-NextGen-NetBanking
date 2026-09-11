import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { Beneficiary } from '../../models/beneficiary.model';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  beneficiaryForm: FormGroup;
  loading = true;
  submitting = false;
  error: string | null = null;
  success: string | null = null;
  showForm = false;

  constructor(
    private beneficiaryService: BeneficiaryService,
    private fb: FormBuilder
  ) {
    this.beneficiaryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      ifsc: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadBeneficiaries();
  }

  loadBeneficiaries(): void {
    this.beneficiaryService.getMyBeneficiaries().subscribe({
      next: (data) => {
        this.beneficiaries = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load beneficiaries';
        this.loading = false;
      }
    });
  }

  addBeneficiary(): void {
    if (this.beneficiaryForm.valid) {
      this.submitting = true;
      this.error = null;
      this.success = null;

      this.beneficiaryService.addBeneficiary(this.beneficiaryForm.value).subscribe({
        next: (beneficiary) => {
          this.beneficiaries.push(beneficiary);
          this.success = 'Beneficiary added successfully';
          this.beneficiaryForm.reset();
          this.showForm = false;
          this.submitting = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to add beneficiary';
          this.submitting = false;
        }
      });
    }
  }

  deleteBeneficiary(id: number): void {
    if (confirm('Are you sure you want to delete this beneficiary?')) {
      this.beneficiaryService.deleteBeneficiary(id).subscribe({
        next: () => {
          this.beneficiaries = this.beneficiaries.filter(b => b.id !== id);
          this.success = 'Beneficiary deleted';
        },
        error: (err) => {
          this.error = 'Failed to delete beneficiary';
        }
      });
    }
  }
}
