package com.placement.service;

import com.placement.dto.CompanyRequests.AdminDriveCreateRequest;
import com.placement.dto.CompanyRequests.DriveRequest;
import com.placement.dto.StudentRequests.AdminStudentCreateRequest;
import com.placement.dto.StudentRequests.AdminStudentUpdateRequest;
import com.placement.model.*;
import com.placement.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

/**
 * Admin service
 */
@Service
public class AdminService {
    
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final DriveRepository driveRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public AdminService(StudentRepository studentRepository, CompanyRepository companyRepository,
                       DriveRepository driveRepository, ApplicationRepository applicationRepository,
                       UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.companyRepository = companyRepository;
        this.driveRepository = driveRepository;
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
    
    public List<Drive> getAllDrives() {
        return driveRepository.findAll();
    }
    
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
    
    @Transactional
    public Student addStudent(AdminStudentCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.STUDENT);
        user = userRepository.save(user);
        
        Student student = new Student();
        student.setUserId(user.getId());
        student.setName(request.getName().trim());
        student.setEmail(request.getEmail().trim().toLowerCase());
        student.setBranch(request.getBranch().trim().toUpperCase());
        student.setCgpa(request.getCgpa());
        student.setYear(request.getYear());
        return studentRepository.save(student);
    }
    
    @Transactional
    public Student updateStudent(Long id, AdminStudentUpdateRequest updatedStudent) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getEmail().equalsIgnoreCase(updatedStudent.getEmail())
                && studentRepository.existsByEmail(updatedStudent.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        student.setName(updatedStudent.getName().trim());
        student.setEmail(updatedStudent.getEmail().trim().toLowerCase());
        student.setBranch(updatedStudent.getBranch().trim().toUpperCase());
        student.setCgpa(updatedStudent.getCgpa());
        student.setYear(updatedStudent.getYear());
        student.setSkills(updatedStudent.getSkills() == null ? null : updatedStudent.getSkills().trim());
        
        return studentRepository.save(student);
    }
    
    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        userRepository.deleteById(student.getUserId());
    }
    
    @Transactional
    public Company updateCompanyStatus(Long id, String status) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        company.setStatus(Company.Status.valueOf(status.trim().toUpperCase()));
        return companyRepository.save(company);
    }
    
    @Transactional
    public void deleteCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        userRepository.deleteById(company.getUserId());
    }
    
    @Transactional
    public Drive createDrive(AdminDriveCreateRequest request) {
        companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Drive drive = new Drive();
        drive.setCompanyId(request.getCompanyId());
        drive.setRole(request.getRole().trim());
        drive.setSalary(request.getSalary());
        drive.setMinCgpa(request.getMinCgpa());
        drive.setBranchesAllowed(request.getBranchesAllowed().trim().toUpperCase());
        drive.setYearAllowed(request.getYearAllowed());
        drive.setDescription(request.getDescription().trim());
        return driveRepository.save(drive);
    }
    
    @Transactional
    public Drive updateDrive(Long id, DriveRequest updatedDrive) {
        Drive drive = driveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drive not found"));
        
        drive.setRole(updatedDrive.getRole().trim());
        drive.setSalary(updatedDrive.getSalary());
        drive.setMinCgpa(updatedDrive.getMinCgpa());
        drive.setBranchesAllowed(updatedDrive.getBranchesAllowed().trim().toUpperCase());
        drive.setYearAllowed(updatedDrive.getYearAllowed());
        drive.setDescription(updatedDrive.getDescription().trim());
        
        return driveRepository.save(drive);
    }
    
    @Transactional
    public void deleteDrive(Long id) {
        driveRepository.deleteById(id);
    }
}
