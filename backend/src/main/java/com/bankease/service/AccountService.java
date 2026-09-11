package com.bankease.service;

import com.bankease.dto.AccountDTO;
import com.bankease.entity.Account;
import com.bankease.entity.User;
import com.bankease.exception.ResourceNotFoundException;
import com.bankease.repository.AccountRepository;
import com.bankease.repository.UserRepository;
import com.bankease.util.AccountNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    public Account createAccount(Long userId, Account.AccountType accountType, BigDecimal initialBalance) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String accountNumber = AccountNumberGenerator.generate();
        while (accountRepository.existsByAccountNumber(accountNumber)) {
            accountNumber = AccountNumberGenerator.generate();
        }

        Account account = Account.builder()
                .accountNumber(accountNumber)
                .user(user)
                .accountType(accountType)
                .balance(initialBalance)
                .status(Account.AccountStatus.ACTIVE)
                .build();

        return accountRepository.save(account);
    }

    public List<AccountDTO> getAccountsByUserId(Long userId) {
        List<Account> accounts = accountRepository.findByUserId(userId);
        return accounts.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public AccountDTO getAccountById(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        return convertToDTO(account);
    }

    public Account getAccountByIdEntity(Long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
    }

    public Account getAccountByNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found: " + accountNumber));
    }

    public Account updateBalance(Long accountId, BigDecimal amount) {
        Account account = getAccountByIdEntity(accountId);
        account.setBalance(account.getBalance().add(amount));
        return accountRepository.save(account);
    }

    private AccountDTO convertToDTO(Account account) {
        return AccountDTO.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .accountType(account.getAccountType().toString())
                .balance(account.getBalance())
                .status(account.getStatus().toString())
                .build();
    }
}
