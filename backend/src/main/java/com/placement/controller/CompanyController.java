package com.placement.controller;

import com.placement.config.JwtUtil;
import com.placement.model.Drive;
import com.placement.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * Company controller
 */
@RestController
@RequestMapping("/api/company")
public class CompanyController {
    
    private final CompanyService companyService;
    private final JwtUtil jwtUtil;
    
    public CompanyController(CompanyService companyService, JwtUtil jwtUtil) {
        this.companyService = companyService;
        this.jwtUtil = jwtUtil;
    }
    
    private Long getUserIdFromToken(String token) {
        return jwtUtil.extractUserId(token.substring(7));
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            return ResponseEntity.ok(companyService.getProfile(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/drives")
    public ResponseEntity<?> createDrive(@RequestHeader("Authorization") String token,
                                        @RequestBody Drive drive) {
        try {
            Long userId = getUserIdFromToken(token);
            return ResponseEntity.ok(companyService.createDrive(userId, drive));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/drives")
    public ResponseEntity<?> getMyDrives(@RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            return ResponseEntity.ok(companyService.getMyDrives(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/drives/{driveId}/applications")
    public ResponseEntity<?> getApplications(@PathVariable Long driveId) {
        try {
            return ResponseEntity.ok(companyService.getApplicationsForDrive(driveId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/applications/{applicationId}")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long applicationId,
                                                     @RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(companyService.updateApplicationStatus(
                applicationId, 
                request.get("status")
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
