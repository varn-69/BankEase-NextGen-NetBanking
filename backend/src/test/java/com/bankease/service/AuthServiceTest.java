package com.bankease.service;

import com.bankease.dto.AuthResponse;
import com.bankease.dto.LoginRequest;
import com.bankease.dto.RegisterRequest;
import com.bankease.entity.User;
import com.bankease.exception.DuplicateResourceException;
import com.bankease.repository.UserRepository;
import com.bankease.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @Mock
    private AuditLogService auditLogService;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest validRegisterRequest;
    private LoginRequest validLoginRequest;
    private User mockUser;

    @BeforeEach
    void setUp() {
        validRegisterRequest = new RegisterRequest();
        validRegisterRequest.setUsername("testuser");
        validRegisterRequest.setEmail("test@example.com");
        validRegisterRequest.setPassword("password123");
        validRegisterRequest.setFirstName("Test");
        validRegisterRequest.setLastName("User");
        validRegisterRequest.setPhone("1234567890");

        validLoginRequest = new LoginRequest();
        validLoginRequest.setUsername("testuser");
        validLoginRequest.setPassword("password123");

        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername("testuser");
        mockUser.setEmail("test@example.com");
        mockUser.setPassword("$2a$10$encodedPassword");
        mockUser.setFirstName("Test");
        mockUser.setLastName("User");
        mockUser.setPhone("1234567890");
        mockUser.setRole(User.Role.CUSTOMER);
        mockUser.setStatus(User.UserStatus.ACTIVE);
        mockUser.setFailedLoginAttempts(0);
    }

    @Test
    void testSuccessfulRegistration() {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("$2a$10$encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);
        when(tokenProvider.generateToken("testuser", "CUSTOMER", 1L)).thenReturn("test-jwt-token");

        AuthResponse response = authService.register(validRegisterRequest);

        assertNotNull(response);
        assertEquals("test-jwt-token", response.getToken());
        assertEquals(1L, response.getUserId());
        assertEquals("testuser", response.getUsername());
        assertEquals("test@example.com", response.getEmail());
        assertEquals("CUSTOMER", response.getRole());

        verify(userRepository).save(any(User.class));
        verify(passwordEncoder).encode("password123");
        verify(tokenProvider).generateToken("testuser", "CUSTOMER", 1L);
        verify(auditLogService).log(anyLong(), eq("REGISTER"), eq("USER"), anyLong(), anyString());
    }

    @Test
    void testRegistrationWithDuplicateUsername() {
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> authService.register(validRegisterRequest));

        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    @Test
    void testRegistrationWithDuplicateEmail() {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> authService.register(validRegisterRequest));

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testSuccessfulLogin() {
        when(userRepository.findByUsername("testuser")).thenReturn(java.util.Optional.of(mockUser));
        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(tokenProvider.generateToken("testuser", "CUSTOMER", 1L)).thenReturn("test-jwt-token");

        AuthResponse response = authService.login(validLoginRequest);

        assertNotNull(response);
        assertEquals("test-jwt-token", response.getToken());
        assertEquals(1L, response.getUserId());
        assertEquals("testuser", response.getUsername());
        assertEquals("test@example.com", response.getEmail());
        assertEquals("CUSTOMER", response.getRole());

        verify(userRepository).save(mockUser);
        verify(authenticationManager).authenticate(any());
        verify(tokenProvider).generateToken("testuser", "CUSTOMER", 1L);
        verify(auditLogService).log(anyLong(), eq("LOGIN"), eq("USER"), anyLong(), anyString());
    }

    @Test
    void testLoginWithInvalidCredentials() {
        when(userRepository.findByUsername("testuser")).thenReturn(java.util.Optional.of(mockUser));
        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("Invalid credentials"));

        assertThrows(BadCredentialsException.class, () -> authService.login(validLoginRequest));

        verify(userRepository).save(mockUser);
        verify(auditLogService).log(anyLong(), eq("LOGIN_FAILED"), eq("USER"), anyLong(), anyString());
    }

    @Test
    void testLoginWithLockedAccount() {
        mockUser.setStatus(User.UserStatus.LOCKED);
        mockUser.setLockedUntil(java.time.LocalDateTime.now().plusHours(1));
        
        when(userRepository.findByUsername("testuser")).thenReturn(java.util.Optional.of(mockUser));

        assertThrows(BadCredentialsException.class, () -> authService.login(validLoginRequest));

        verify(authenticationManager, never()).authenticate(any());
    }

    @Test
    void testPasswordEncoding() {
        when(passwordEncoder.encode("password123")).thenReturn("$2a$10$encodedPassword");
        
        String encodedPassword = passwordEncoder.encode("password123");
        
        assertNotNull(encodedPassword);
        assertNotEquals("password123", encodedPassword);
        assertTrue(encodedPassword.startsWith("$2a$"));
    }
}
