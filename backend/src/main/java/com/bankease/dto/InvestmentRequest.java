package com.bankease.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvestmentRequest {
    private String investmentType;
    private String productName;
    private BigDecimal amount;
    private Long accountId;
    private String transactionPin;
}
