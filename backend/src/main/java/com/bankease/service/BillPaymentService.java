package com.bankease.service;

import com.bankease.dto.BillPaymentRequest;
import com.bankease.dto.TransactionDTO;
import com.bankease.entity.*;
import com.bankease.exception.InsufficientBalanceException;
import com.bankease.exception.InvalidTransactionException;
import com.bankease.exception.ResourceNotFoundException;
import com.bankease.repository.*;
import com.bankease.util.TransactionRefGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BillPaymentService {
    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillPaymentRepository billPaymentRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AuditLogService auditLogService;

    private static final String DEFAULT_PIN = "1234";

    public List<Bill> getBillsByUserId(Long userId) {
        return billRepository.findByUserId(userId);
    }

    public Bill getBillById(Long billId) {
        return billRepository.findById(billId)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found"));
    }

    @Transactional
    public TransactionDTO payBill(Long userId, BillPaymentRequest request) {
        // Validate PIN
        if (!request.getTransactionPin().equals(DEFAULT_PIN)) {
            throw new InvalidTransactionException("Invalid transaction PIN");
        }

        Bill bill = getBillById(request.getBillId());
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        // Validate ownership
        if (!bill.getUser().getId().equals(userId) || !account.getUser().getId().equals(userId)) {
            throw new InvalidTransactionException("Unauthorized");
        }

        // Validate bill status
        if (bill.getStatus() == Bill.BillStatus.PAID) {
            throw new InvalidTransactionException("Bill already paid");
        }

        // Check balance
        if (account.getBalance().compareTo(bill.getAmount()) < 0) {
            throw new InsufficientBalanceException("Insufficient balance for bill payment");
        }

        // Debit account
        account.setBalance(account.getBalance().subtract(bill.getAmount()));
        accountRepository.save(account);

        // Create transaction
        String reference = TransactionRefGenerator.generate();
        Transaction transaction = new Transaction();
        transaction.setTransactionReference(reference);
        transaction.setSenderAccount(account);
        transaction.setAmount(bill.getAmount());
        transaction.setTransactionType(Transaction.TransactionType.BILL_PAYMENT);
        transaction.setStatus(Transaction.TransactionStatus.SUCCESS);
        transaction.setDescription("Bill payment: " + bill.getBiller());

        Transaction savedTransaction = transactionRepository.save(transaction);

        // Record bill payment
        BillPayment billPayment = new BillPayment();
        billPayment.setBill(bill);
        billPayment.setAccount(account);
        billPayment.setAmount(bill.getAmount());
        billPayment.setTransaction(savedTransaction);
        billPayment.setPaidAt(LocalDateTime.now());

        billPaymentRepository.save(billPayment);

        // Mark bill as paid
        bill.setStatus(Bill.BillStatus.PAID);
        billRepository.save(bill);

        // Audit log
        auditLogService.log(userId, "BILL_PAYMENT", "BILL", bill.getId(),
                "Bill payment of ₹" + bill.getAmount() + " to " + bill.getBiller());

        TransactionDTO dto = new TransactionDTO();
        dto.setId(savedTransaction.getId());
        dto.setTransactionReference(savedTransaction.getTransactionReference());
        dto.setAmount(savedTransaction.getAmount());
        dto.setTransactionType(savedTransaction.getTransactionType().toString());
        dto.setStatus(savedTransaction.getStatus().toString());
        dto.setDescription(savedTransaction.getDescription());
        dto.setCreatedAt(savedTransaction.getCreatedAt().toString());
        return dto;
    }
}
