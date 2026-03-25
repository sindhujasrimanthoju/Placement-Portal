package com.placement.service;

import com.placement.model.*;
import com.placement.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Student service
 */
@Service
public class StudentService {
    
    private final StudentRepository studentRepository;
    private final DriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final CompanyRepository companyRepository;
    
    public StudentService(StudentRepository studentRepository, DriveRepository driveRepository,
                         ApplicationRepository applicationRepository, CompanyRepository companyRepository) {
        this.studentRepository = studentRepository;
        this.driveRepository = driveRepository;
        this.applicationRepository = applicationRepository;
        this.companyRepository = companyRepository;
    }
    
    public Student getProfile(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }
    
    @Transactional
    public Student updateProfile(Long userId, Student updatedStudent) {
        Student student = getProfile(userId);
        student.setName(updatedStudent.getName());
        student.setBranch(updatedStudent.getBranch());
        student.setCgpa(updatedStudent.getCgpa());
        student.setYear(updatedStudent.getYear());
        student.setSkills(updatedStudent.getSkills());
        if (updatedStudent.getResumeUrl() != null) {
            student.setResumeUrl(updatedStudent.getResumeUrl());
        }
        return studentRepository.save(student);
    }
    
    public List<Map<String, Object>> getEligibleDrives(Long userId) {
        Student student = getProfile(userId);
        List<Drive> allDrives = driveRepository.findAll();
        
        return allDrives.stream()
                .filter(drive -> isEligible(student, drive))
                .map(drive -> {
                    Map<String, Object> driveMap = new HashMap<>();
                    driveMap.put("id", drive.getId());
                    driveMap.put("role", drive.getRole());
                    driveMap.put("salary", drive.getSalary());
                    driveMap.put("minCgpa", drive.getMinCgpa());
                    driveMap.put("branchesAllowed", drive.getBranchesAllowed());
                    driveMap.put("yearAllowed", drive.getYearAllowed());
                    driveMap.put("description", drive.getDescription());
                    
                    Company company = companyRepository.findById(drive.getCompanyId()).orElse(null);
                    if (company != null && company.getStatus() == Company.Status.APPROVED) {
                        driveMap.put("companyName", company.getName());
                    }
                    
                    boolean applied = applicationRepository.existsByStudentIdAndDriveId(student.getId(), drive.getId());
                    driveMap.put("applied", applied);
                    
                    return driveMap;
                })
                .collect(Collectors.toList());
    }
    
    private boolean isEligible(Student student, Drive drive) {
        Company company = companyRepository.findById(drive.getCompanyId()).orElse(null);
        if (company == null || company.getStatus() != Company.Status.APPROVED) {
            return false;
        }
        
        if (student.getCgpa() < drive.getMinCgpa()) {
            return false;
        }
        
        if (!drive.getBranchesAllowed().contains(student.getBranch())) {
            return false;
        }
        
        return student.getYear().equals(drive.getYearAllowed());
    }
    
    @Transactional
    public Application applyToDrive(Long userId, Long driveId) {
        Student student = getProfile(userId);
        Drive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive not found"));
        
        if (!isEligible(student, drive)) {
            throw new RuntimeException("Not eligible for this drive");
        }
        
        if (applicationRepository.existsByStudentIdAndDriveId(student.getId(), driveId)) {
            throw new RuntimeException("Already applied to this drive");
        }
        
        Application application = new Application();
        application.setStudentId(student.getId());
        application.setDriveId(driveId);
        return applicationRepository.save(application);
    }
    
    public List<Map<String, Object>> getApplications(Long userId) {
        Student student = getProfile(userId);
        List<Application> applications = applicationRepository.findByStudentId(student.getId());
        
        return applications.stream()
                .map(app -> {
                    Map<String, Object> appMap = new HashMap<>();
                    appMap.put("id", app.getId());
                    appMap.put("status", app.getStatus().name());
                    appMap.put("appliedAt", app.getAppliedAt());
                    
                    Drive drive = driveRepository.findById(app.getDriveId()).orElse(null);
                    if (drive != null) {
                        appMap.put("role", drive.getRole());
                        appMap.put("salary", drive.getSalary());
                        
                        Company company = companyRepository.findById(drive.getCompanyId()).orElse(null);
                        if (company != null) {
                            appMap.put("companyName", company.getName());
                        }
                    }
                    
                    return appMap;
                })
                .collect(Collectors.toList());
    }
}
