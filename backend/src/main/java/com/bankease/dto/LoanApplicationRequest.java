package com.bankease.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplicationRequest {
    private String loanType;
    private BigDecimal principal;
    private Integer tenureMonths;
}
