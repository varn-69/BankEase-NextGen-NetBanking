package com.bankease.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvestmentDTO {
    private Long id;
    private String investmentType;
    private String productName;
    private BigDecimal amountInvested;
    private BigDecimal units;
    private BigDecimal purchasePrice;
    private BigDecimal currentValue;
    private LocalDateTime createdAt;
}
