package com.bankease.dto;

import lombok.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillPaymentRequest {
    @NotNull(message = "Bill ID is required")
    private Long billId;

    @NotNull(message = "Account ID is required")
    private Long accountId;

    @NotBlank(message = "Transaction PIN is required")
    private String transactionPin;
}
