package com.bankease.service;

import com.bankease.dto.DashboardDTO;
import com.bankease.entity.Account;
import com.bankease.entity.Bill;
import com.bankease.exception.ResourceNotFoundException;
import com.bankease.repository.AccountRepository;
import com.bankease.repository.BillRepository;
import com.bankease.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private InvestmentService investmentService;

    public DashboardDTO getDashboard(Long userId) {
        List<Account> accounts = accountRepository.findByUserId(userId);
        if (accounts.isEmpty()) {
            throw new ResourceNotFoundException("No accounts found for user");
        }

        BigDecimal totalBalance = BigDecimal.ZERO;
        BigDecimal savingsBalance = BigDecimal.ZERO;
        BigDecimal currentBalance = BigDecimal.ZERO;

        for (Account account : accounts) {
            totalBalance = totalBalance.add(account.getBalance());
            if (account.getAccountType() == Account.AccountType.SAVINGS) {
                savingsBalance = savingsBalance.add(account.getBalance());
            } else if (account.getAccountType() == Account.AccountType.CURRENT) {
                currentBalance = currentBalance.add(account.getBalance());
            }
        }

        List<Bill> pendingBills = billRepository.findByUserIdAndStatus(userId, Bill.BillStatus.PENDING);
        long activeLoans = loanRepository.findByUserId(userId).stream()
                .filter(l -> l.getStatus().toString().equals("ACTIVE"))
                .count();

        BigDecimal investmentValue = investmentService.getPortfolioValue(userId);

        return DashboardDTO.builder()
                .totalBalance(totalBalance)
                .savingsBalance(savingsBalance)
                .currentBalance(currentBalance)
                .accountCount((long) accounts.size())
                .pendingBills((long) pendingBills.size())
                .activeLoans(activeLoans)
                .investmentPortfolioValue(investmentValue)
                .lastLogin(java.time.LocalDateTime.now())
                .build();
    }
}
