package com.bankease.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBeneficiaryRequest {
    private String name;
    private String accountNumber;
    private String bankName;
    private String ifsc;
}
