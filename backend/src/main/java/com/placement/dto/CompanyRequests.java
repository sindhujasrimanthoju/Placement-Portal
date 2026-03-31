package com.placement.dto;

import jakarta.validation.constraints.*;

public class CompanyRequests {

    public static class DriveRequest {
        @NotBlank
        @Size(max = 100)
        private String role;

        @NotNull
        @DecimalMin(value = "0.0", inclusive = false)
        private Double salary;

        @NotNull
        @DecimalMin(value = "0.0")
        @DecimalMax(value = "10.0")
        private Double minCgpa;

        @NotBlank
        @Size(max = 255)
        private String branchesAllowed;

        @NotNull
        @Min(1)
        @Max(4)
        private Integer yearAllowed;

        @NotBlank
        @Size(max = 4000)
        private String description;

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public Double getSalary() {
            return salary;
        }

        public void setSalary(Double salary) {
            this.salary = salary;
        }

        public Double getMinCgpa() {
            return minCgpa;
        }

        public void setMinCgpa(Double minCgpa) {
            this.minCgpa = minCgpa;
        }

        public String getBranchesAllowed() {
            return branchesAllowed;
        }

        public void setBranchesAllowed(String branchesAllowed) {
            this.branchesAllowed = branchesAllowed;
        }

        public Integer getYearAllowed() {
            return yearAllowed;
        }

        public void setYearAllowed(Integer yearAllowed) {
            this.yearAllowed = yearAllowed;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class AdminDriveCreateRequest extends DriveRequest {
        @NotNull
        private Long companyId;

        public Long getCompanyId() {
            return companyId;
        }

        public void setCompanyId(Long companyId) {
            this.companyId = companyId;
        }
    }

    public static class StatusUpdateRequest {
        @NotBlank
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
