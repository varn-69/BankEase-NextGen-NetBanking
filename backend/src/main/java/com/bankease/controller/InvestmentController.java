package com.bankease.controller;

import com.bankease.dto.InvestmentRequest;
import com.bankease.dto.InvestmentDTO;
import com.bankease.service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/investments")
@CrossOrigin(origins = "*")
public class InvestmentController {
    @Autowired
    private InvestmentService investmentService;

    @PostMapping
    public ResponseEntity<InvestmentDTO> purchaseInvestment(
            @Valid @RequestBody InvestmentRequest request,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        InvestmentDTO investment = investmentService.purchaseInvestment(userId, request);
        return new ResponseEntity<>(investment, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InvestmentDTO>> getMyInvestments(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        List<InvestmentDTO> investments = investmentService.getInvestmentsByUserId(userId);
        return ResponseEntity.ok(investments);
    }

    @GetMapping("/portfolio/value")
    public ResponseEntity<BigDecimal> getPortfolioValue(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        BigDecimal portfolioValue = investmentService.getPortfolioValue(userId);
        return ResponseEntity.ok(portfolioValue);
    }
}
