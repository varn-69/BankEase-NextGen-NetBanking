package com.bankease.service;

import com.bankease.entity.AuditLog;
import com.bankease.entity.User;
import com.bankease.repository.AuditLogRepository;
import com.bankease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuditLogService {
    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private UserRepository userRepository;

    public void log(Long userId, String action, String entityType, Long entityId, String details) {
        User user = null;
        if (userId != null) {
            user = userRepository.findById(userId).orElse(null);
        }

        AuditLog log = AuditLog.builder()
                .user(user)
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .timestamp(LocalDateTime.now())
                .details(details)
                .build();

        auditLogRepository.save(log);
    }
}
