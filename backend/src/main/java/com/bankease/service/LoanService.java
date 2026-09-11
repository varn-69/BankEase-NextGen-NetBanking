package com.bankease.service;

import com.bankease.dto.LoanApplicationRequest;
import com.bankease.dto.LoanDTO;
import com.bankease.entity.Loan;
import com.bankease.entity.User;
import com.bankease.exception.ResourceNotFoundException;
import com.bankease.repository.LoanRepository;
import com.bankease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogService auditLogService;

    private static final java.util.Map<String, BigDecimal> LOAN_RATES = java.util.Map.ofEntries(
            java.util.Map.entry("Personal Loan", new BigDecimal("12.5")),
            java.util.Map.entry("Education Loan", new BigDecimal("8.5")),
            java.util.Map.entry("Home Loan", new BigDecimal("6.5")),
            java.util.Map.entry("Vehicle Loan", new BigDecimal("9.5"))
    );

    public LoanDTO applyForLoan(Long userId, LoanApplicationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        BigDecimal interestRate = LOAN_RATES.getOrDefault(request.getLoanType(), new BigDecimal("10.0"));
        BigDecimal emi = calculateEMI(request.getPrincipal(), interestRate, request.getTenureMonths());

        Loan loan = Loan.builder()
                .user(user)
                .loanType(request.getLoanType())
                .principal(request.getPrincipal())
                .interestRate(interestRate)
                .tenureMonths(request.getTenureMonths())
                .emi(emi)
                .outstandingAmount(request.getPrincipal())
                .status(Loan.LoanStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        Loan saved = loanRepository.save(loan);

        auditLogService.log(userId, "LOAN_APPLICATION", "LOAN", saved.getId(),
                "Loan application for ₹" + request.getPrincipal() + " (" + request.getLoanType() + ")");

        return convertToDTO(saved);
    }

    public List<LoanDTO> getLoansByUserId(Long userId) {
        List<Loan> loans = loanRepository.findByUserId(userId);
        return loans.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public LoanDTO getLoanById(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        return convertToDTO(loan);
    }

    public LoanDTO approveLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        loan.setStatus(Loan.LoanStatus.APPROVED);
        loan.setApprovedAt(LocalDateTime.now());
        Loan saved = loanRepository.save(loan);

        auditLogService.log(loan.getUser().getId(), "LOAN_APPROVED", "LOAN", loan.getId(),
                "Loan of ₹" + loan.getPrincipal() + " approved");

        return convertToDTO(saved);
    }

    public LoanDTO rejectLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        loan.setStatus(Loan.LoanStatus.REJECTED);
        Loan saved = loanRepository.save(loan);

        auditLogService.log(loan.getUser().getId(), "LOAN_REJECTED", "LOAN", loan.getId(),
                "Loan of ₹" + loan.getPrincipal() + " rejected");

        return convertToDTO(saved);
    }

    public BigDecimal calculateEMI(BigDecimal principal, BigDecimal annualRate, Integer months) {
        BigDecimal monthlyRate = annualRate.divide(new BigDecimal("1200"), 6, RoundingMode.HALF_UP);
        BigDecimal numerator = monthlyRate.multiply(
                monthlyRate.add(BigDecimal.ONE).pow(months)
        );
        BigDecimal denominator = monthlyRate.add(BigDecimal.ONE).pow(months).subtract(BigDecimal.ONE);
        return principal.multiply(numerator).divide(denominator, 2, RoundingMode.HALF_UP);
    }

    private LoanDTO convertToDTO(Loan loan) {
        return LoanDTO.builder()
                .id(loan.getId())
                .loanType(loan.getLoanType())
                .principal(loan.getPrincipal())
                .interestRate(loan.getInterestRate())
                .tenureMonths(loan.getTenureMonths())
                .emi(loan.getEmi())
                .outstandingAmount(loan.getOutstandingAmount())
                .status(loan.getStatus().toString())
                .appliedAt(loan.getAppliedAt())
                .approvedAt(loan.getApprovedAt())
                .build();
    }
}
