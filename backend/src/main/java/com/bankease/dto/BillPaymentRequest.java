package com.bankease.dto;

import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillPaymentRequest {
    private Long billId;
    private Long accountId;
    private String transactionPin;
}
