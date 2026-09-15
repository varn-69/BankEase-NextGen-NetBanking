import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'accounts', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transfers', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'beneficiaries', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'loans', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'investments', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
