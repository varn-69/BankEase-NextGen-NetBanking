package com.bankease.controller;

import com.bankease.dto.LoanApplicationRequest;
import com.bankease.dto.LoanDTO;
import com.bankease.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "*")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @PostMapping("/apply")
    public ResponseEntity<LoanDTO> applyForLoan(
            @Valid @RequestBody LoanApplicationRequest request,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        LoanDTO loan = loanService.applyForLoan(userId, request);
        return new ResponseEntity<>(loan, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LoanDTO>> getMyLoans(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        List<LoanDTO> loans = loanService.getLoansByUserId(userId);
        return ResponseEntity.ok(loans);
    }

    @GetMapping("/{loanId}")
    public ResponseEntity<LoanDTO> getLoanById(@PathVariable Long loanId) {
        LoanDTO loan = loanService.getLoanById(loanId);
        return ResponseEntity.ok(loan);
    }

    @PostMapping("/{loanId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LoanDTO> approveLoan(@PathVariable Long loanId) {
        LoanDTO loan = loanService.approveLoan(loanId);
        return ResponseEntity.ok(loan);
    }

    @PostMapping("/{loanId}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LoanDTO> rejectLoan(@PathVariable Long loanId) {
        LoanDTO loan = loanService.rejectLoan(loanId);
        return ResponseEntity.ok(loan);
    }
}
