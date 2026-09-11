package com.bankease.service;

import com.bankease.entity.User;
import com.bankease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deactivateUser(Long userId) {
        User user = getUserById(userId);
        user.setStatus(User.UserStatus.INACTIVE);
        userRepository.save(user);
    }

    public void activateUser(Long userId) {
        User user = getUserById(userId);
        user.setStatus(User.UserStatus.ACTIVE);
        userRepository.save(user);
    }
}
