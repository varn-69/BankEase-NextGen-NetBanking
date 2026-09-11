package com.bankease.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BeneficiaryDTO {
    private Long id;
    private String name;
    private String accountNumber;
    private String bankName;
    private String ifsc;
    private String status;
}
