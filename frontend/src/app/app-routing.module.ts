import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TransfersComponent } from './transfers/transfers.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BillsComponent } from './bills/bills.component';
import { LoansComponent } from './loans/loans.component';
import { InvestmentsComponent } from './investments/investments.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: 'transfers', component: TransfersComponent, canActivate: [AuthGuard] },
  { path: 'beneficiaries', component: BeneficiariesComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillsComponent, canActivate: [AuthGuard] },
  { path: 'loans', component: LoansComponent, canActivate: [AuthGuard] },
  { path: 'investments', component: InvestmentsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
