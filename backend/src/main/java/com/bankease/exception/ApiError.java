package com.bankease.exception;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiError {
    private String timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}
