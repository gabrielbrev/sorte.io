package com.sorte.io.apirestful.service;

import com.sorte.io.apirestful.model.Giveaway;
import com.sorte.io.apirestful.model.User;
import com.sorte.io.apirestful.repository.GiveawayRepository;
import com.sorte.io.apirestful.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    GiveawayRepository giveawayRepository;

    public void createUser(User user) {
        userRepository.save(user);
    }

    public User findById(String id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return user.get();
    }
}
