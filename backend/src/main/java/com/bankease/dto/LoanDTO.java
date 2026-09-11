package com.bankease.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanDTO {
    private Long id;
    private String loanType;
    private BigDecimal principal;
    private BigDecimal interestRate;
    private Integer tenureMonths;
    private BigDecimal emi;
    private BigDecimal outstandingAmount;
    private String status;
    private LocalDateTime appliedAt;
    private LocalDateTime approvedAt;
}
