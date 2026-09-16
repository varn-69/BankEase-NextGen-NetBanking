package com.bankease.controller;

import com.bankease.dto.TransactionDTO;
import com.bankease.entity.Transaction;
import com.bankease.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getMyTransactions(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        List<Transaction> transactions = transactionService.getTransactionsByUserId(userId);
        List<TransactionDTO> transactionDTOs = transactions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(transactionDTOs);
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Long transactionId) {
        Transaction transaction = transactionService.getTransactionById(transactionId);
        return ResponseEntity.ok(convertToDTO(transaction));
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