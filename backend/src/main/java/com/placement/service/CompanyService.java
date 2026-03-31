package com.placement.service;

import com.placement.dto.CompanyRequests.DriveRequest;
import com.placement.model.*;
import com.placement.repository.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Company service
 */
@Service
public class CompanyService {
    
    private final CompanyRepository companyRepository;
    private final DriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    
    public CompanyService(CompanyRepository companyRepository, DriveRepository driveRepository,
                         ApplicationRepository applicationRepository, StudentRepository studentRepository) {
        this.companyRepository = companyRepository;
        this.driveRepository = driveRepository;
        this.applicationRepository = applicationRepository;
        this.studentRepository = studentRepository;
    }
    
    public Company getProfile(Long userId) {
        return companyRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }
    
    @Transactional
    public Drive createDrive(Long userId, DriveRequest request) {
        Company company = getProfile(userId);
        
        if (company.getStatus() != Company.Status.APPROVED) {
            throw new RuntimeException("Company not approved yet");
        }
        
        Drive drive = new Drive();
        drive.setCompanyId(company.getId());
        drive.setRole(request.getRole().trim());
        drive.setSalary(request.getSalary());
        drive.setMinCgpa(request.getMinCgpa());
        drive.setBranchesAllowed(request.getBranchesAllowed().trim().toUpperCase());
        drive.setYearAllowed(request.getYearAllowed());
        drive.setDescription(request.getDescription().trim());
        return driveRepository.save(drive);
    }
    
    public List<Drive> getMyDrives(Long userId) {
        Company company = getProfile(userId);
        return driveRepository.findByCompanyId(company.getId());
    }
    
    public List<Map<String, Object>> getApplicationsForDrive(Long userId, Long driveId) {
        Company company = getProfile(userId);
        Drive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive not found"));
        if (!drive.getCompanyId().equals(company.getId())) {
            throw new AccessDeniedException("You can only access applications for your own drives");
        }

        List<Application> applications = applicationRepository.findByDriveId(driveId);
        
        return applications.stream()
                .map(app -> {
                    Map<String, Object> appMap = new HashMap<>();
                    appMap.put("id", app.getId());
                    appMap.put("status", app.getStatus().name());
                    appMap.put("appliedAt", app.getAppliedAt());
                    
                    Student student = studentRepository.findById(app.getStudentId()).orElse(null);
                    if (student != null) {
                        appMap.put("studentName", student.getName());
                        appMap.put("email", student.getEmail());
                        appMap.put("branch", student.getBranch());
                        appMap.put("cgpa", student.getCgpa());
                        appMap.put("year", student.getYear());
                        appMap.put("skills", student.getSkills());
                        appMap.put("resumeUrl", student.getResumeUrl());
                    }
                    
                    return appMap;
                })
                .collect(Collectors.toList());
    }
    
    @Transactional
    public Application updateApplicationStatus(Long userId, Long applicationId, String status) {
        Company company = getProfile(userId);
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        Drive drive = driveRepository.findById(application.getDriveId())
                .orElseThrow(() -> new RuntimeException("Drive not found"));
        if (!drive.getCompanyId().equals(company.getId())) {
            throw new AccessDeniedException("You can only update applications for your own drives");
        }
        
        application.setStatus(Application.Status.valueOf(status.trim().toUpperCase()));
        return applicationRepository.save(application);
    }
}
