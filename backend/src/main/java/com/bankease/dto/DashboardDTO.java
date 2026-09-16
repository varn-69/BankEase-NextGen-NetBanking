package com.bankease.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DashboardDTO {
    private BigDecimal totalBalance;
    private BigDecimal savingsBalance;
    private BigDecimal currentBalance;
    private Long accountCount;
    private Long pendingBills;
    private Long activeLoans;
    private BigDecimal investmentPortfolioValue;
    private LocalDateTime lastLogin;

    public DashboardDTO() {
    }

    public DashboardDTO(BigDecimal totalBalance, BigDecimal savingsBalance, BigDecimal currentBalance, Long accountCount, Long pendingBills, Long activeLoans, BigDecimal investmentPortfolioValue, LocalDateTime lastLogin) {
        this.totalBalance = totalBalance;
        this.savingsBalance = savingsBalance;
        this.currentBalance = currentBalance;
        this.accountCount = accountCount;
        this.pendingBills = pendingBills;
        this.activeLoans = activeLoans;
        this.investmentPortfolioValue = investmentPortfolioValue;
        this.lastLogin = lastLogin;
    }

    public BigDecimal getTotalBalance() { return totalBalance; }
    public void setTotalBalance(BigDecimal totalBalance) { this.totalBalance = totalBalance; }

    public BigDecimal getSavingsBalance() { return savingsBalance; }
    public void setSavingsBalance(BigDecimal savingsBalance) { this.savingsBalance = savingsBalance; }

    public BigDecimal getCurrentBalance() { return currentBalance; }
    public void setCurrentBalance(BigDecimal currentBalance) { this.currentBalance = currentBalance; }

    public Long getAccountCount() { return accountCount; }
    public void setAccountCount(Long accountCount) { this.accountCount = accountCount; }

    public Long getPendingBills() { return pendingBills; }
    public void setPendingBills(Long pendingBills) { this.pendingBills = pendingBills; }

    public Long getActiveLoans() { return activeLoans; }
    public void setActiveLoans(Long activeLoans) { this.activeLoans = activeLoans; }

    public BigDecimal getInvestmentPortfolioValue() { return investmentPortfolioValue; }
    public void setInvestmentPortfolioValue(BigDecimal investmentPortfolioValue) { this.investmentPortfolioValue = investmentPortfolioValue; }

    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
}
