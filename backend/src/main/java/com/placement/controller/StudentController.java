package com.placement.controller;

import com.placement.config.AuthenticatedUser;
import com.placement.dto.StudentRequests.StudentProfileUpdateRequest;
import com.placement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Student controller
 */
@RestController
@RequestMapping("/api/student")
public class StudentController {
    
    private final StudentService studentService;
    
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal AuthenticatedUser user) {
        return ResponseEntity.ok(studentService.getProfile(user.userId()));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal AuthenticatedUser user,
                                           @Valid @RequestBody StudentProfileUpdateRequest request) {
        return ResponseEntity.ok(studentService.updateProfile(user.userId(), request));
    }
    
    @GetMapping("/drives")
    public ResponseEntity<?> getEligibleDrives(@AuthenticationPrincipal AuthenticatedUser user) {
        return ResponseEntity.ok(studentService.getEligibleDrives(user.userId()));
    }
    
    @PostMapping("/apply/{driveId}")
    public ResponseEntity<?> applyToDrive(@AuthenticationPrincipal AuthenticatedUser user,
                                          @PathVariable Long driveId) {
        return ResponseEntity.ok(studentService.applyToDrive(user.userId(), driveId));
    }
    
    @GetMapping("/applications")
    public ResponseEntity<?> getApplications(@AuthenticationPrincipal AuthenticatedUser user) {
        return ResponseEntity.ok(studentService.getApplications(user.userId()));
    }
}
