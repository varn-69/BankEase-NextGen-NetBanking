package com.bankease.dto;

import java.math.BigDecimal;

public class LoanDTO {
    private Long id;
    private String loanType;
    private BigDecimal principal;
    private BigDecimal interestRate;
    private Integer tenureMonths;
    private BigDecimal emi;
    private BigDecimal outstandingAmount;
    private String status;
    private String appliedAt;
    private String approvedAt;

    public LoanDTO() {
    }

    public LoanDTO(Long id, String loanType, BigDecimal principal, BigDecimal interestRate, Integer tenureMonths, BigDecimal emi, BigDecimal outstandingAmount, String status, String appliedAt, String approvedAt) {
        this.id = id;
        this.loanType = loanType;
        this.principal = principal;
        this.interestRate = interestRate;
        this.tenureMonths = tenureMonths;
        this.emi = emi;
        this.outstandingAmount = outstandingAmount;
        this.status = status;
        this.appliedAt = appliedAt;
        this.approvedAt = approvedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLoanType() { return loanType; }
    public void setLoanType(String loanType) { this.loanType = loanType; }

    public BigDecimal getPrincipal() { return principal; }
    public void setPrincipal(BigDecimal principal) { this.principal = principal; }

    public BigDecimal getInterestRate() { return interestRate; }
    public void setInterestRate(BigDecimal interestRate) { this.interestRate = interestRate; }

    public Integer getTenureMonths() { return tenureMonths; }
    public void setTenureMonths(Integer tenureMonths) { this.tenureMonths = tenureMonths; }

    public BigDecimal getEmi() { return emi; }
    public void setEmi(BigDecimal emi) { this.emi = emi; }

    public BigDecimal getOutstandingAmount() { return outstandingAmount; }
    public void setOutstandingAmount(BigDecimal outstandingAmount) { this.outstandingAmount = outstandingAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAppliedAt() { return appliedAt; }
    public void setAppliedAt(String appliedAt) { this.appliedAt = appliedAt; }

    public String getApprovedAt() { return approvedAt; }
    public void setApprovedAt(String approvedAt) { this.approvedAt = approvedAt; }
}
