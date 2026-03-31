package com.placement.controller;

import com.placement.dto.AuthRequests.CompanyRegistrationRequest;
import com.placement.dto.AuthRequests.LoginRequest;
import com.placement.dto.AuthRequests.StudentRegistrationRequest;
import com.placement.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication controller
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(
            request.getUsername(),
            request.getPassword()
        ));
    }
    
    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@Valid @RequestBody StudentRegistrationRequest request) {
        return ResponseEntity.ok(authService.registerStudent(request));
    }
    
    @PostMapping("/register/company")
    public ResponseEntity<?> registerCompany(@Valid @RequestBody CompanyRegistrationRequest request) {
        return ResponseEntity.ok(authService.registerCompany(request));
    }
}
