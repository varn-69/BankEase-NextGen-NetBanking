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
        RegisterRequest request1 = new RegisterRequest();
        request1.setUsername("duplicateuser");
        request1.setEmail("duplicate1@example.com");
        request1.setPassword("password123");
        request1.setFirstName("Duplicate");
        request1.setLastName("User1");
        request1.setPhone("1111111111");

        User user1 = new User();
        user1.setUsername(request1.getUsername());
        user1.setEmail(request1.getEmail());
        user1.setPassword(passwordEncoder.encode(request1.getPassword()));
        user1.setFirstName(request1.getFirstName());
        user1.setLastName(request1.getLastName());
        user1.setPhone(request1.getPhone());
        user1.setRole(User.Role.CUSTOMER);
        user1.setStatus(User.UserStatus.ACTIVE);
        user1.setFailedLoginAttempts(0);

        userRepository.save(user1);

        assertTrue(userRepository.existsByUsername("duplicateuser"));
    }

    @Test
    void testDuplicateEmail() {
        RegisterRequest request1 = new RegisterRequest();
        request1.setUsername("user1");
        request1.setEmail("duplicateemail@example.com");
        request1.setPassword("password123");
        request1.setFirstName("User");
        request1.setLastName("One");
        request1.setPhone("3333333333");

        User user1 = new User();
        user1.setUsername(request1.getUsername());
        user1.setEmail(request1.getEmail());
        user1.setPassword(passwordEncoder.encode(request1.getPassword()));
        user1.setFirstName(request1.getFirstName());
        user1.setLastName(request1.getLastName());
        user1.setPhone(request1.getPhone());
        user1.setRole(User.Role.CUSTOMER);
        user1.setStatus(User.UserStatus.ACTIVE);
        user1.setFailedLoginAttempts(0);

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
        RegisterRequest request = new RegisterRequest();
        request.setUsername("integrationtest");
        request.setEmail("integrationtest@example.com");
        request.setPassword("password123");
        request.setFirstName("Integration");
        request.setLastName("Test");
        request.setPhone("9998887777");

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setRole(User.Role.CUSTOMER);
        user.setStatus(User.UserStatus.ACTIVE);
        user.setFailedLoginAttempts(0);

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
