package com.placement.controller;

import com.placement.model.*;
import com.placement.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * Admin controller
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    private final AdminService adminService;
    
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    
    // Student management
    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }
    
    @PostMapping("/students")
    public ResponseEntity<?> addStudent(@RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(adminService.addStudent(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/students/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        try {
            return ResponseEntity.ok(adminService.updateStudent(id, student));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        try {
            adminService.deleteStudent(id);
            return ResponseEntity.ok(Map.of("message", "Student deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Company management
    @GetMapping("/companies")
    public ResponseEntity<?> getAllCompanies() {
        return ResponseEntity.ok(adminService.getAllCompanies());
    }
    
    @PutMapping("/companies/{id}/status")
    public ResponseEntity<?> updateCompanyStatus(@PathVariable Long id,
                                                 @RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(adminService.updateCompanyStatus(id, request.get("status")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/companies/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
        try {
            adminService.deleteCompany(id);
            return ResponseEntity.ok(Map.of("message", "Company deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Drive management
    @GetMapping("/drives")
    public ResponseEntity<?> getAllDrives() {
        return ResponseEntity.ok(adminService.getAllDrives());
    }
    
    @PostMapping("/drives")
    public ResponseEntity<?> createDrive(@RequestBody Drive drive) {
        try {
            return ResponseEntity.ok(adminService.createDrive(drive));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/drives/{id}")
    public ResponseEntity<?> updateDrive(@PathVariable Long id, @RequestBody Drive drive) {
        try {
            return ResponseEntity.ok(adminService.updateDrive(id, drive));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/drives/{id}")
    public ResponseEntity<?> deleteDrive(@PathVariable Long id) {
        try {
            adminService.deleteDrive(id);
            return ResponseEntity.ok(Map.of("message", "Drive deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Applications
    @GetMapping("/applications")
    public ResponseEntity<?> getAllApplications() {
        return ResponseEntity.ok(adminService.getAllApplications());
    }
}
