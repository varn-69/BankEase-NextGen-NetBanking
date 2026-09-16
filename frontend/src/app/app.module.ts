import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountDialogComponent } from './accounts/create-account-dialog.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { AddBeneficiaryDialogComponent } from './beneficiaries/add-beneficiary-dialog.component';
import { DeleteConfirmationDialogComponent } from './beneficiaries/delete-confirmation-dialog.component';
import { BillsComponent } from './bills/bills.component';
import { InvestmentsComponent } from './investments/investments.component';
import { LoansComponent } from './loans/loans.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransfersComponent } from './transfers/transfers.component';
import { TransferConfirmationDialogComponent } from './transfers/transfer-confirmation-dialog.component';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { DashboardService } from './core/services/dashboard.service';
import { AccountService } from './core/services/account.service';
import { TransferService } from './core/services/transfer.service';
import { BeneficiaryService } from './core/services/beneficiary.service';
import { BillService } from './core/services/bill.service';
import { LoanService } from './core/services/loan.service';
import { InvestmentService } from './core/services/investment.service';
import { TransactionService } from './core/services/transaction.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    AccountsComponent,
    CreateAccountDialogComponent,
    BeneficiariesComponent,
    AddBeneficiaryDialogComponent,
    DeleteConfirmationDialogComponent,
    BillsComponent,
    InvestmentsComponent,
    LoansComponent,
    TransactionsComponent,
    TransfersComponent,
    TransferConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    DashboardService,
    AccountService,
    TransferService,
    BeneficiaryService,
    BillService,
    LoanService,
    InvestmentService,
    TransactionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
