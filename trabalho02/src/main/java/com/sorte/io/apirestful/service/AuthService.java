package com.sorte.io.apirestful.service;

import com.sorte.io.apirestful.model.User;
import com.sorte.io.apirestful.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public User login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmailAndPassword(email, password);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authentication failed");
        }

        return optionalUser.get();
    }
}
