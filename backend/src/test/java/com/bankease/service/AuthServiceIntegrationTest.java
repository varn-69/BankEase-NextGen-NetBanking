package com.bankease.service;

import com.bankease.dto.RegisterRequest;
import com.bankease.entity.User;
import com.bankease.exception.DuplicateResourceException;
import com.bankease.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class AuthServiceIntegrationTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void testDuplicateUsername() {
        RegisterRequest request1 = RegisterRequest.builder()
                .username("duplicateuser")
                .email("duplicate1@example.com")
                .password("password123")
                .firstName("Duplicate")
                .lastName("User1")
                .phone("1111111111")
                .build();

        User user1 = User.builder()
                .username(request1.getUsername())
                .email(request1.getEmail())
                .password(passwordEncoder.encode(request1.getPassword()))
                .firstName(request1.getFirstName())
                .lastName(request1.getLastName())
                .phone(request1.getPhone())
                .role(User.Role.CUSTOMER)
                .status(User.UserStatus.ACTIVE)
                .failedLoginAttempts(0)
                .build();

        userRepository.save(user1);

        assertTrue(userRepository.existsByUsername("duplicateuser"));
    }

    @Test
    void testDuplicateEmail() {
        RegisterRequest request1 = RegisterRequest.builder()
                .username("user1")
                .email("duplicateemail@example.com")
                .password("password123")
                .firstName("User")
                .lastName("One")
                .phone("3333333333")
                .build();

        User user1 = User.builder()
                .username(request1.getUsername())
                .email(request1.getEmail())
                .password(passwordEncoder.encode(request1.getPassword()))
                .firstName(request1.getFirstName())
                .lastName(request1.getLastName())
                .phone(request1.getPhone())
                .role(User.Role.CUSTOMER)
                .status(User.UserStatus.ACTIVE)
                .failedLoginAttempts(0)
                .build();

        userRepository.save(user1);

        assertTrue(userRepository.existsByEmail("duplicateemail@example.com"));
    }

    @Test
    void testPasswordHashing() {
        String plainPassword = "password123";
        String hashedPassword = passwordEncoder.encode(plainPassword);

        assertNotNull(hashedPassword);
        assertNotEquals(plainPassword, hashedPassword);
        assertTrue(passwordEncoder.matches(plainPassword, hashedPassword));
        assertFalse(passwordEncoder.matches("wrongpassword", hashedPassword));
        assertTrue(hashedPassword.startsWith("$2a$"));
    }

    @Test
    void testUserCreation() {
        RegisterRequest request = RegisterRequest.builder()
                .username("integrationtest")
                .email("integrationtest@example.com")
                .password("password123")
                .firstName("Integration")
                .lastName("Test")
                .phone("9998887777")
                .build();

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

        assertNotNull(savedUser.getId());
        assertEquals("integrationtest", savedUser.getUsername());
        assertEquals("integrationtest@example.com", savedUser.getEmail());
        assertEquals("Integration", savedUser.getFirstName());
        assertEquals("Test", savedUser.getLastName());
        assertEquals("9998887777", savedUser.getPhone());
        assertEquals(User.Role.CUSTOMER, savedUser.getRole());
        assertEquals(User.UserStatus.ACTIVE, savedUser.getStatus());
        assertEquals(0, savedUser.getFailedLoginAttempts());
        assertTrue(passwordEncoder.matches("password123", savedUser.getPassword()));
    }
}
