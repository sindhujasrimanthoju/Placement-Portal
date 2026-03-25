package com.placement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * Placement Drive entity
 */
@Entity
@Table(name = "drives")
@Data
public class Drive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "company_id", nullable = false)
    private Long companyId;
    
    @Column(nullable = false)
    private String role;
    
    @Column(nullable = false)
    private Double salary;
    
    @Column(name = "min_cgpa", nullable = false)
    private Double minCgpa;
    
    @Column(name = "branches_allowed", nullable = false)
    private String branchesAllowed;
    
    @Column(name = "year_allowed", nullable = false)
    private Integer yearAllowed;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
