package com.placement.service;

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
    public Student addStudent(Map<String, String> request) {
        User user = new User();
        user.setUsername(request.get("username"));
        user.setPassword(passwordEncoder.encode(request.get("password")));
        user.setRole(User.Role.STUDENT);
        user = userRepository.save(user);
        
        Student student = new Student();
        student.setUserId(user.getId());
        student.setName(request.get("name"));
        student.setEmail(request.get("email"));
        student.setBranch(request.get("branch"));
        student.setCgpa(Double.parseDouble(request.get("cgpa")));
        student.setYear(Integer.parseInt(request.get("year")));
        return studentRepository.save(student);
    }
    
    @Transactional
    public Student updateStudent(Long id, Student updatedStudent) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        student.setBranch(updatedStudent.getBranch());
        student.setCgpa(updatedStudent.getCgpa());
        student.setYear(updatedStudent.getYear());
        student.setSkills(updatedStudent.getSkills());
        
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
        
        company.setStatus(Company.Status.valueOf(status));
        return companyRepository.save(company);
    }
    
    @Transactional
    public void deleteCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        userRepository.deleteById(company.getUserId());
    }
    
    @Transactional
    public Drive createDrive(Drive drive) {
        return driveRepository.save(drive);
    }
    
    @Transactional
    public Drive updateDrive(Long id, Drive updatedDrive) {
        Drive drive = driveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drive not found"));
        
        drive.setRole(updatedDrive.getRole());
        drive.setSalary(updatedDrive.getSalary());
        drive.setMinCgpa(updatedDrive.getMinCgpa());
        drive.setBranchesAllowed(updatedDrive.getBranchesAllowed());
        drive.setYearAllowed(updatedDrive.getYearAllowed());
        drive.setDescription(updatedDrive.getDescription());
        
        return driveRepository.save(drive);
    }
    
    @Transactional
    public void deleteDrive(Long id) {
        driveRepository.deleteById(id);
    }
}
