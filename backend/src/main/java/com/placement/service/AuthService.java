package com.placement.service;

import com.placement.config.JwtUtil;
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
    public Map<String, Object> registerStudent(Map<String, String> request) {
        if (userRepository.existsByUsername(request.get("username"))) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(request.get("username"));
        user.setPassword(passwordEncoder.encode(request.get("password")));
        user.setRole(User.Role.STUDENT);
        user = userRepository.save(user);
        
        Student student = new Student();
        student.setUserId(user.getId());
        student.setName(request.get("name"));
        student.setEmail(request.get("email"));
        student.setBranch(request.get("branch"));
        student.setCgpa(Double.parseDouble(request.get("cgpa")));
        student.setYear(Integer.parseInt(request.get("year")));
        studentRepository.save(student);
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name(), user.getId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());
        response.put("userId", user.getId());
        
        return response;
    }
    
    @Transactional
    public Map<String, Object> registerCompany(Map<String, String> request) {
        if (userRepository.existsByUsername(request.get("username"))) {
            throw new RuntimeException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(request.get("username"));
        user.setPassword(passwordEncoder.encode(request.get("password")));
        user.setRole(User.Role.COMPANY);
        user = userRepository.save(user);
        
        Company company = new Company();
        company.setUserId(user.getId());
        company.setName(request.get("name"));
        company.setEmail(request.get("email"));
        company.setDescription(request.get("description"));
        companyRepository.save(company);
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name(), user.getId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());
        response.put("userId", user.getId());
        
        return response;
    }
}
