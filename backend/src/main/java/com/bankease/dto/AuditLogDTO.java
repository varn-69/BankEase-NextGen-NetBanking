package com.bankease.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLogDTO {
    private Long id;
    private String username;
    private String action;
    private String entityType;
    private Long entityId;
    private String ipAddress;
    private LocalDateTime timestamp;
    private String details;
}
