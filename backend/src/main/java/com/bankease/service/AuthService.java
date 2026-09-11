package com.bankease.service;

import com.bankease.dto.RegisterRequest;
import com.bankease.dto.LoginRequest;
import com.bankease.dto.AuthResponse;
import com.bankease.entity.User;
import com.bankease.exception.DuplicateResourceException;
import com.bankease.repository.UserRepository;
import com.bankease.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuditLogService auditLogService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username already exists: " + request.getUsername());
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists: " + request.getEmail());
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .role(User.Role.CUSTOMER)
                .status(User.UserStatus.ACTIVE)
                .failedLoginAttempts(0)
                .build();

        User savedUser = userRepository.save(user);

        String token = tokenProvider.generateToken(savedUser.getUsername(), savedUser.getRole().toString());

        auditLogService.log(savedUser.getId(), "REGISTER", "USER", savedUser.getId(), "User registered");

        return AuthResponse.builder()
                .token(token)
                .userId(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().toString())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (user.getStatus() == User.UserStatus.LOCKED) {
            if (user.getLockedUntil() != null && LocalDateTime.now().isAfter(user.getLockedUntil())) {
                user.setStatus(User.UserStatus.ACTIVE);
                user.setFailedLoginAttempts(0);
                userRepository.save(user);
            } else {
                throw new BadCredentialsException("Account is locked");
            }
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            user.setFailedLoginAttempts(0);
            userRepository.save(user);

            String token = tokenProvider.generateToken(user.getUsername(), user.getRole().toString());

            auditLogService.log(user.getId(), "LOGIN", "USER", user.getId(), "User logged in");

            return AuthResponse.builder()
                    .token(token)
                    .userId(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .role(user.getRole().toString())
                    .build();
        } catch (BadCredentialsException e) {
            user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
            if (user.getFailedLoginAttempts() >= 5) {
                user.setStatus(User.UserStatus.LOCKED);
                user.setLockedUntil(LocalDateTime.now().plusHours(1));
            }
            userRepository.save(user);

            auditLogService.log(user.getId(), "LOGIN_FAILED", "USER", user.getId(), "Failed login attempt");

            throw new BadCredentialsException("Invalid credentials");
        }
    }
}
