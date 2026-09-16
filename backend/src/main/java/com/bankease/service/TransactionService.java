package com.bankease.service;

import com.bankease.entity.Transaction;
import com.bankease.entity.Account;
import com.bankease.exception.ResourceNotFoundException;
import com.bankease.repository.TransactionRepository;
import com.bankease.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<Transaction> getTransactionsByUserId(Long userId) {
        List<Account> userAccounts = accountRepository.findByUserId(userId);
        List<Long> accountIds = userAccounts.stream().map(Account::getId).collect(Collectors.toList());
        
        List<Transaction> transactions = transactionRepository.findBySenderAccountIdIn(accountIds);
        transactions.addAll(transactionRepository.findByReceiverAccountIdIn(accountIds));
        
        return transactions.stream().distinct().collect(Collectors.toList());
    }

    public Transaction getTransactionById(Long transactionId) {
        return transactionRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
    }
}