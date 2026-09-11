import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./pages/accounts/accounts.component').then(m => m.AccountsComponent)
      },
      {
        path: 'transfers',
        loadComponent: () => import('./pages/transfers/transfers.component').then(m => m.TransfersComponent)
      },
      {
        path: 'beneficiaries',
        loadComponent: () => import('./pages/beneficiaries/beneficiaries.component').then(m => m.BeneficiariesComponent)
      },
      {
        path: 'bills',
        loadComponent: () => import('./pages/bills/bills.component').then(m => m.BillsComponent)
      },
      {
        path: 'loans',
        loadComponent: () => import('./pages/loans/loans.component').then(m => m.LoansComponent)
      },
      {
        path: 'investments',
        loadComponent: () => import('./pages/investments/investments.component').then(m => m.InvestmentsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
