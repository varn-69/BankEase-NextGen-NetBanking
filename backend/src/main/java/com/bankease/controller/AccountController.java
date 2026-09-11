package com.bankease.controller;

import com.bankease.dto.AccountDTO;
import com.bankease.entity.Account;
import com.bankease.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<AccountDTO> createAccount(
            @RequestParam Account.AccountType accountType,
            @RequestParam BigDecimal initialBalance,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        Account account = accountService.createAccount(userId, accountType, initialBalance);
        AccountDTO dto = AccountDTO.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .accountType(account.getAccountType().toString())
                .balance(account.getBalance())
                .status(account.getStatus().toString())
                .build();
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AccountDTO>> getMyAccounts(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        List<AccountDTO> accounts = accountService.getAccountsByUserId(userId);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountDTO> getAccountById(
            @PathVariable Long accountId,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        AccountDTO account = accountService.getAccountById(accountId);
        return ResponseEntity.ok(account);
    }
}
