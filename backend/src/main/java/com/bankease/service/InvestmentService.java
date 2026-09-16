package com.bankease.service;

import com.bankease.dto.InvestmentRequest;
import com.bankease.dto.InvestmentDTO;
import com.bankease.entity.Account;
import com.bankease.entity.Investment;
import com.bankease.entity.Transaction;
import com.bankease.exception.InsufficientBalanceException;
import com.bankease.exception.InvalidTransactionException;
import com.bankease.exception.ResourceNotFoundException;
import com.bankease.repository.AccountRepository;
import com.bankease.repository.InvestmentRepository;
import com.bankease.repository.TransactionRepository;
import com.bankease.util.TransactionRefGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvestmentService {
    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AuditLogService auditLogService;

    private static final String DEFAULT_PIN = "1234";
    private static final java.util.Map<String, BigDecimal> INVESTMENT_RETURNS = java.util.Map.ofEntries(
            java.util.Map.entry("Fixed Deposit", new BigDecimal("0.065")),
            java.util.Map.entry("Recurring Deposit", new BigDecimal("0.050")),
            java.util.Map.entry("Mutual Fund", new BigDecimal("0.120")),
            java.util.Map.entry("Savings Investment", new BigDecimal("0.035"))
    );

    @Transactional
    public InvestmentDTO purchaseInvestment(Long userId, InvestmentRequest request) {
        // Validate PIN
        if (!request.getTransactionPin().equals(DEFAULT_PIN)) {
            throw new InvalidTransactionException("Invalid transaction PIN");
        }

        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        // Validate ownership
        if (!account.getUser().getId().equals(userId)) {
            throw new InvalidTransactionException("Unauthorized");
        }

        // Check balance
        if (account.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientBalanceException("Insufficient balance");
        }

        // Debit account
        account.setBalance(account.getBalance().subtract(request.getAmount()));
        accountRepository.save(account);

        // Create transaction
        String reference = TransactionRefGenerator.generate();
        Transaction transaction = new Transaction();
        transaction.setTransactionReference(reference);
        transaction.setSenderAccount(account);
        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(Transaction.TransactionType.INVESTMENT);
        transaction.setStatus(Transaction.TransactionStatus.SUCCESS);
        transaction.setDescription("Investment in " + request.getInvestmentType());

        transactionRepository.save(transaction);

        // Create investment
        BigDecimal units = request.getAmount().divide(new BigDecimal("100"), 2, java.math.RoundingMode.HALF_UP);
        BigDecimal currentValue = request.getAmount();

        Investment investment = new Investment();
        investment.setUser(account.getUser());
        investment.setInvestmentType(request.getInvestmentType());
        investment.setProductName(request.getProductName());
        investment.setAmountInvested(request.getAmount());
        investment.setUnits(units);
        investment.setPurchasePrice(new BigDecimal("100"));
        investment.setCurrentValue(currentValue);

        Investment saved = investmentRepository.save(investment);

        auditLogService.log(userId, "INVESTMENT_PURCHASE", "INVESTMENT", saved.getId(),
                "Investment of ₹" + request.getAmount() + " in " + request.getProductName());

        return convertToDTO(saved);
    }

    public List<InvestmentDTO> getInvestmentsByUserId(Long userId) {
        List<Investment> investments = investmentRepository.findByUserId(userId);
        return investments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public BigDecimal getPortfolioValue(Long userId) {
        List<Investment> investments = investmentRepository.findByUserId(userId);
        return investments.stream()
                .map(Investment::getCurrentValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private InvestmentDTO convertToDTO(Investment investment) {
        InvestmentDTO dto = new InvestmentDTO();
        dto.setId(investment.getId());
        dto.setInvestmentType(investment.getInvestmentType());
        dto.setProductName(investment.getProductName());
        dto.setAmountInvested(investment.getAmountInvested());
        dto.setUnits(investment.getUnits());
        dto.setPurchasePrice(investment.getPurchasePrice());
        dto.setCurrentValue(investment.getCurrentValue());
        dto.setCreatedAt(investment.getCreatedAt().toString());
        return dto;
    }
}
