package com.bankease.service;

import com.bankease.dto.TransferRequest;
import com.bankease.dto.TransactionDTO;
import com.bankease.entity.Account;
import com.bankease.entity.Transaction;
import com.bankease.exception.InsufficientBalanceException;
import com.bankease.exception.InvalidTransactionException;
import com.bankease.exception.ResourceNotFoundException;
import com.bankease.repository.TransactionRepository;
import com.bankease.repository.AccountRepository;
import com.bankease.util.TransactionRefGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

@Service
public class TransferService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AuditLogService auditLogService;

    private static final String DEFAULT_PIN = "1234";
    private static final BigDecimal DAILY_LIMIT = new BigDecimal("100000.00");

    @Transactional
    public TransactionDTO transfer(Long userId, TransferRequest request) {
        // Validate PIN
        if (!request.getTransactionPin().equals(DEFAULT_PIN)) {
            throw new InvalidTransactionException("Invalid transaction PIN");
        }

        // Get accounts
        Account fromAccount = accountRepository.findById(request.getFromAccountId())
                .orElseThrow(() -> new ResourceNotFoundException("Source account not found"));

        Account toAccount = accountRepository.findById(request.getToAccountId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination account not found"));

        // Validate ownership
        if (!fromAccount.getUser().getId().equals(userId)) {
            throw new InvalidTransactionException("You do not have permission to transfer from this account");
        }

        // Validate accounts are active
        if (fromAccount.getStatus() != Account.AccountStatus.ACTIVE) {
            throw new InvalidTransactionException("Source account is not active");
        }
        if (toAccount.getStatus() != Account.AccountStatus.ACTIVE) {
            throw new InvalidTransactionException("Destination account is not active");
        }

        // Validate amount
        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidTransactionException("Transfer amount must be greater than zero");
        }

        // Check balance
        if (fromAccount.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientBalanceException("Insufficient balance for transfer");
        }

        // Check daily limit
        if (request.getAmount().compareTo(DAILY_LIMIT) > 0) {
            throw new InvalidTransactionException("Transfer amount exceeds daily limit of ₹" + DAILY_LIMIT);
        }

        // Debit sender
        fromAccount.setBalance(fromAccount.getBalance().subtract(request.getAmount()));
        accountRepository.save(fromAccount);

        // Credit receiver
        toAccount.setBalance(toAccount.getBalance().add(request.getAmount()));
        accountRepository.save(toAccount);

        // Create transaction record
        String reference = TransactionRefGenerator.generate();
        Transaction transaction = new Transaction();
        transaction.setTransactionReference(reference);
        transaction.setSenderAccount(fromAccount);
        transaction.setReceiverAccount(toAccount);
        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(Transaction.TransactionType.TRANSFER);
        transaction.setStatus(Transaction.TransactionStatus.SUCCESS);
        transaction.setDescription(request.getDescription());

        Transaction saved = transactionRepository.save(transaction);

        // Audit log
        auditLogService.log(userId, "TRANSFER", "TRANSACTION", saved.getId(),
                "Transfer of ₹" + request.getAmount() + " from account " +
                        fromAccount.getAccountNumber() + " to " + toAccount.getAccountNumber());

        return convertToDTO(saved);
    }

    private TransactionDTO convertToDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setTransactionReference(transaction.getTransactionReference());
        dto.setAmount(transaction.getAmount());
        dto.setTransactionType(transaction.getTransactionType().toString());
        dto.setStatus(transaction.getStatus().toString());
        dto.setDescription(transaction.getDescription());
        dto.setCreatedAt(transaction.getCreatedAt().toString());
        return dto;
    }
}
