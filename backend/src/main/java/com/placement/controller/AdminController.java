package com.placement.controller;

import com.placement.dto.CompanyRequests.AdminDriveCreateRequest;
import com.placement.dto.CompanyRequests.DriveRequest;
import com.placement.dto.CompanyRequests.StatusUpdateRequest;
import com.placement.dto.StudentRequests.AdminStudentCreateRequest;
import com.placement.dto.StudentRequests.AdminStudentUpdateRequest;
import com.placement.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> addStudent(@Valid @RequestBody AdminStudentCreateRequest request) {
        return ResponseEntity.ok(adminService.addStudent(request));
    }
    
    @PutMapping("/students/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @Valid @RequestBody AdminStudentUpdateRequest student) {
        return ResponseEntity.ok(adminService.updateStudent(id, student));
    }
    
    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        adminService.deleteStudent(id);
        return ResponseEntity.ok(java.util.Map.of("message", "Student deleted successfully"));
    }
    
    // Company management
    @GetMapping("/companies")
    public ResponseEntity<?> getAllCompanies() {
        return ResponseEntity.ok(adminService.getAllCompanies());
    }
    
    @PutMapping("/companies/{id}/status")
    public ResponseEntity<?> updateCompanyStatus(@PathVariable Long id,
                                                 @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(adminService.updateCompanyStatus(id, request.getStatus()));
    }
    
    @DeleteMapping("/companies/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
        adminService.deleteCompany(id);
        return ResponseEntity.ok(java.util.Map.of("message", "Company deleted successfully"));
    }
    
    // Drive management
    @GetMapping("/drives")
    public ResponseEntity<?> getAllDrives() {
        return ResponseEntity.ok(adminService.getAllDrives());
    }
    
    @PostMapping("/drives")
    public ResponseEntity<?> createDrive(@Valid @RequestBody AdminDriveCreateRequest drive) {
        return ResponseEntity.ok(adminService.createDrive(drive));
    }
    
    @PutMapping("/drives/{id}")
    public ResponseEntity<?> updateDrive(@PathVariable Long id, @Valid @RequestBody DriveRequest drive) {
        return ResponseEntity.ok(adminService.updateDrive(id, drive));
    }
    
    @DeleteMapping("/drives/{id}")
    public ResponseEntity<?> deleteDrive(@PathVariable Long id) {
        adminService.deleteDrive(id);
        return ResponseEntity.ok(java.util.Map.of("message", "Drive deleted successfully"));
    }
    
    // Applications
    @GetMapping("/applications")
    public ResponseEntity<?> getAllApplications() {
        return ResponseEntity.ok(adminService.getAllApplications());
    }
}
