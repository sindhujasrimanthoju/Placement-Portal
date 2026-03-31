package com.placement.service;

import com.placement.config.JwtUtil;
import com.placement.dto.AuthRequests.CompanyRegistrationRequest;
import com.placement.dto.AuthRequests.StudentRegistrationRequest;
import com.placement.model.*;
import com.placement.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.Map;

/**
 * Authentication service
 */
@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public AuthService(UserRepository userRepository, StudentRepository studentRepository,
                      CompanyRepository companyRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    
    public Map<String, Object> login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(username, user.getRole().name(), user.getId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());
        response.put("userId", user.getId());
        
        return response;
    }
    
    @Transactional
    public Map<String, Object> registerStudent(StudentRegistrationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.STUDENT);
        user = userRepository.save(user);
        
        Student student = new Student();
        student.setUserId(user.getId());
        student.setName(request.getName().trim());
        student.setEmail(request.getEmail().trim().toLowerCase());
        student.setBranch(request.getBranch().trim().toUpperCase());
        student.setCgpa(request.getCgpa());
        student.setYear(request.getYear());
        studentRepository.save(student);
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name(), user.getId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());
        response.put("userId", user.getId());
        
        return response;
    }
    
    @Transactional
    public Map<String, Object> registerCompany(CompanyRegistrationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (companyRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.COMPANY);
        user = userRepository.save(user);
        
        Company company = new Company();
        company.setUserId(user.getId());
        company.setName(request.getName().trim());
        company.setEmail(request.getEmail().trim().toLowerCase());
        company.setDescription(request.getDescription().trim());
        companyRepository.save(company);
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name(), user.getId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());
        response.put("userId", user.getId());
        
        return response;
    }
}
