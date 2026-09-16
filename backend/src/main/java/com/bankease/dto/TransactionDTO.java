package com.bankease.dto;

import java.math.BigDecimal;

public class TransactionDTO {
    private Long id;
    private String transactionReference;
    private BigDecimal amount;
    private String transactionType;
    private String status;
    private String description;
    private String createdAt;

    public TransactionDTO() {
    }

    public TransactionDTO(Long id, String transactionReference, BigDecimal amount, String transactionType, String status, String description, String createdAt) {
        this.id = id;
        this.transactionReference = transactionReference;
        this.amount = amount;
        this.transactionType = transactionType;
        this.status = status;
        this.description = description;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
