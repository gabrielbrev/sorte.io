package com.sorte.io.apirestful.controller;

import com.sorte.io.apirestful.dto.request.AuthRequest;
import com.sorte.io.apirestful.dto.response.AuthResponse;
import com.sorte.io.apirestful.model.User;
import com.sorte.io.apirestful.service.AuthService;
import com.sorte.io.apirestful.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest authRequest) {
        User user = authService.login(authRequest.getEmail(), authRequest.getPassword());
        return ResponseEntity.ok(new AuthResponse(user));
    }
}
