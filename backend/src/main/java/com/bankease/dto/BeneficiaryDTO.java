package com.bankease.dto;

public class BeneficiaryDTO {
    private Long id;
    private String name;
    private String accountNumber;
    private String bankName;
    private String ifsc;
    private String status;

    public BeneficiaryDTO() {
    }

    public BeneficiaryDTO(Long id, String name, String accountNumber, String bankName, String ifsc, String status) {
        this.id = id;
        this.name = name;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.ifsc = ifsc;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getIfsc() { return ifsc; }
    public void setIfsc(String ifsc) { this.ifsc = ifsc; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
