import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Accounts', icon: 'account_balance', route: '/accounts' },
    { label: 'Transfer Money', icon: 'send', route: '/transfers' },
    { label: 'Beneficiaries', icon: 'people', route: '/beneficiaries' },
    { label: 'Transactions', icon: 'receipt_long', route: '/transactions' },
    { label: 'Bills', icon: 'receipt', route: '/bills' },
    { label: 'Loans', icon: 'payments', route: '/loans' },
    { label: 'Investments', icon: 'trending_up', route: '/investments' },
    { label: 'Profile', icon: 'person', route: '/profile' }
  ];

  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    return this.authService.getCurrentUser();
  }
}
