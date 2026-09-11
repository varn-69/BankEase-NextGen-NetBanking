package com.bankease.controller;

import com.bankease.dto.TransferRequest;
import com.bankease.dto.TransactionDTO;
import com.bankease.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transfers")
@CrossOrigin(origins = "*")
public class TransferController {
    @Autowired
    private TransferService transferService;

    @PostMapping
    public ResponseEntity<TransactionDTO> initiateTransfer(
            @Valid @RequestBody TransferRequest request,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        TransactionDTO transaction = transferService.transfer(userId, request);
        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }
}
