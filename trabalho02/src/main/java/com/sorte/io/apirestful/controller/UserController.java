package com.sorte.io.apirestful.controller;

import com.sorte.io.apirestful.model.User;
import com.sorte.io.apirestful.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/new")
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }

    @GetMapping("/find")
    public User findById(@RequestParam("id") String id) {
        return userService.findById(id);
    }

}
