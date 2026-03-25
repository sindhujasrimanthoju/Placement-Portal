package com.placement.service;

import com.placement.model.*;
import com.placement.repository.*;
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
    public Drive createDrive(Long userId, Drive drive) {
        Company company = getProfile(userId);
        
        if (company.getStatus() != Company.Status.APPROVED) {
            throw new RuntimeException("Company not approved yet");
        }
        
        drive.setCompanyId(company.getId());
        return driveRepository.save(drive);
    }
    
    public List<Drive> getMyDrives(Long userId) {
        Company company = getProfile(userId);
        return driveRepository.findByCompanyId(company.getId());
    }
    
    public List<Map<String, Object>> getApplicationsForDrive(Long driveId) {
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
    public Application updateApplicationStatus(Long applicationId, String status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        application.setStatus(Application.Status.valueOf(status));
        return applicationRepository.save(application);
    }
}
