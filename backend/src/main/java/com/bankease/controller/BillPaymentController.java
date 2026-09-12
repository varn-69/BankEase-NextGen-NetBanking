package com.bankease.controller;

import com.bankease.dto.BillPaymentRequest;
import com.bankease.dto.TransactionDTO;
import com.bankease.entity.Bill;
import com.bankease.service.BillPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/bills")
@CrossOrigin(origins = "*")
public class BillPaymentController {
    @Autowired
    private BillPaymentService billPaymentService;

    @GetMapping
    public ResponseEntity<List<Bill>> getMyBills(Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        List<Bill> bills = billPaymentService.getBillsByUserId(userId);
        return ResponseEntity.ok(bills);
    }

    @GetMapping("/{billId}")
    public ResponseEntity<Bill> getBillById(@PathVariable Long billId) {
        Bill bill = billPaymentService.getBillById(billId);
        return ResponseEntity.ok(bill);
    }

    @PostMapping("/pay")
    public ResponseEntity<TransactionDTO> payBill(
            @Valid @RequestBody BillPaymentRequest request,
            Authentication authentication) {
        Long userId = Long.parseLong(authentication.getName());
        TransactionDTO transaction = billPaymentService.payBill(userId, request);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }
}
