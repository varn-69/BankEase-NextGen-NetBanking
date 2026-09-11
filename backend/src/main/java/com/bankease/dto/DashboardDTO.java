package com.bankease.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardDTO {
    private BigDecimal totalBalance;
    private BigDecimal savingsBalance;
    private BigDecimal currentBalance;
    private Long accountCount;
    private Long pendingBills;
    private Long activeLoans;
    private BigDecimal investmentPortfolioValue;
    private LocalDateTime lastLogin;
}
