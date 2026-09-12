package com.bankease.controller;

import com.bankease.dto.BeneficiaryDTO;
import com.bankease.dto.CreateBeneficiaryRequest;
import com.bankease.service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/beneficiaries")
@CrossOrigin(origins = "*")
public class BeneficiaryController {
    @Autowired
    private BeneficiaryService beneficiaryService;

    @PostMapping
    public ResponseEntity<BeneficiaryDTO> addBeneficiary(
            @Valid @RequestBody CreateBeneficiaryRequest request,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        BeneficiaryDTO beneficiary = beneficiaryService.createBeneficiary(userId, request);
        return new ResponseEntity<>(beneficiary, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BeneficiaryDTO>> getMyBeneficiaries(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        List<BeneficiaryDTO> beneficiaries = beneficiaryService.getBeneficiariesByUserId(userId);
        return ResponseEntity.ok(beneficiaries);
    }

    @DeleteMapping("/{beneficiaryId}")
    public ResponseEntity<Void> deleteBeneficiary(
            @PathVariable Long beneficiaryId,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        beneficiaryService.deleteBeneficiary(beneficiaryId, userId);
        return ResponseEntity.noContent().build();
    }
}
