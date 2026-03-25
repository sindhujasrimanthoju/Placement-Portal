package com.placement.controller;

import com.placement.config.JwtUtil;
import com.placement.model.Student;
import com.placement.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * Student controller
 */
@RestController
@RequestMapping("/api/student")
public class StudentController {
    
    private final StudentService studentService;
    private final JwtUtil jwtUtil;
    
    public StudentController(StudentService studentService, JwtUtil jwtUtil) {
        this.studentService = studentService;
        this.jwtUtil = jwtUtil;
    }
    
    private Long getUserIdFromToken(String token) {
        return jwtUtil.extractUserId(token.substring(7));
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            return ResponseEntity.ok(studentService.getProfile(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String token,
                                          @RequestBody Student student) {
        try {
            Long userId = getUserIdFromToken(token);
            return ResponseEntity.ok(studentService.updateProfile(userId, student));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/drives")
    public ResponseEntity<?> getEligibleDrives(@RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            return ResponseEntity.ok(studentService.getEligibleDrives(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/apply/{driveId}")
    public ResponseEntity<?> applyToDrive(@RequestHeader("Authorization") String token,
                                         @PathVariable Long driveId) {
        try {
            Long userId = getUserIdFromToken(token);
            return ResponseEntity.ok(studentService.applyToDrive(userId, driveId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/applications")
    public ResponseEntity<?> getApplications(@RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            return ResponseEntity.ok(studentService.getApplications(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
