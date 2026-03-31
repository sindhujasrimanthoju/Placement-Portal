package com.placement.controller;

import com.placement.config.AuthenticatedUser;
import com.placement.dto.CompanyRequests.DriveRequest;
import com.placement.dto.CompanyRequests.StatusUpdateRequest;
import com.placement.service.CompanyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Company controller
 */
@RestController
@RequestMapping("/api/company")
public class CompanyController {
    
    private final CompanyService companyService;
    
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal AuthenticatedUser user) {
        return ResponseEntity.ok(companyService.getProfile(user.userId()));
    }
    
    @PostMapping("/drives")
    public ResponseEntity<?> createDrive(@AuthenticationPrincipal AuthenticatedUser user,
                                         @Valid @RequestBody DriveRequest request) {
        return ResponseEntity.ok(companyService.createDrive(user.userId(), request));
    }
    
    @GetMapping("/drives")
    public ResponseEntity<?> getMyDrives(@AuthenticationPrincipal AuthenticatedUser user) {
        return ResponseEntity.ok(companyService.getMyDrives(user.userId()));
    }
    
    @GetMapping("/drives/{driveId}/applications")
    public ResponseEntity<?> getApplications(@AuthenticationPrincipal AuthenticatedUser user,
                                             @PathVariable Long driveId) {
        return ResponseEntity.ok(companyService.getApplicationsForDrive(user.userId(), driveId));
    }
    
    @PutMapping("/applications/{applicationId}")
    public ResponseEntity<?> updateApplicationStatus(@AuthenticationPrincipal AuthenticatedUser user,
                                                     @PathVariable Long applicationId,
                                                     @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(companyService.updateApplicationStatus(
            user.userId(),
            applicationId,
            request.getStatus()
        ));
    }
}
