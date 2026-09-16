package com.bankease.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

public class BillPaymentRequest {
    @NotNull(message = "Bill ID is required")
    private Long billId;

    @NotNull(message = "Account ID is required")
    private Long accountId;

    @NotBlank(message = "Transaction PIN is required")
    private String transactionPin;

    public BillPaymentRequest() {
    }

    public Long getBillId() { return billId; }
    public void setBillId(Long billId) { this.billId = billId; }

    public Long getAccountId() { return accountId; }
    public void setAccountId(Long accountId) { this.accountId = accountId; }

    public String getTransactionPin() { return transactionPin; }
    public void setTransactionPin(String transactionPin) { this.transactionPin = transactionPin; }
}
