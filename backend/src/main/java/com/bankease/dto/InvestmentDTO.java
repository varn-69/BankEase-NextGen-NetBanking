package com.bankease.dto;

import java.math.BigDecimal;

public class InvestmentDTO {
    private Long id;
    private String investmentType;
    private String productName;
    private BigDecimal amountInvested;
    private BigDecimal units;
    private BigDecimal purchasePrice;
    private BigDecimal currentValue;
    private String createdAt;

    public InvestmentDTO() {
    }

    public InvestmentDTO(Long id, String investmentType, String productName, BigDecimal amountInvested, BigDecimal units, BigDecimal purchasePrice, BigDecimal currentValue, String createdAt) {
        this.id = id;
        this.investmentType = investmentType;
        this.productName = productName;
        this.amountInvested = amountInvested;
        this.units = units;
        this.purchasePrice = purchasePrice;
        this.currentValue = currentValue;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInvestmentType() { return investmentType; }
    public void setInvestmentType(String investmentType) { this.investmentType = investmentType; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public BigDecimal getAmountInvested() { return amountInvested; }
    public void setAmountInvested(BigDecimal amountInvested) { this.amountInvested = amountInvested; }

    public BigDecimal getUnits() { return units; }
    public void setUnits(BigDecimal units) { this.units = units; }

    public BigDecimal getPurchasePrice() { return purchasePrice; }
    public void setPurchasePrice(BigDecimal purchasePrice) { this.purchasePrice = purchasePrice; }

    public BigDecimal getCurrentValue() { return currentValue; }
    public void setCurrentValue(BigDecimal currentValue) { this.currentValue = currentValue; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
