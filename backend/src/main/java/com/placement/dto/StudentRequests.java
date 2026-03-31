package com.placement.dto;

import jakarta.validation.constraints.*;

public class StudentRequests {

    public static class StudentProfileUpdateRequest {
        @NotBlank
        @Size(max = 100)
        private String name;

        @NotBlank
        @Size(max = 50)
        private String branch;

        @NotNull
        @DecimalMin(value = "0.0")
        @DecimalMax(value = "10.0")
        private Double cgpa;

        @NotNull
        @Min(1)
        @Max(4)
        private Integer year;

        @Size(max = 2000)
        private String skills;

        @Size(max = 255)
        private String resumeUrl;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getBranch() {
            return branch;
        }

        public void setBranch(String branch) {
            this.branch = branch;
        }

        public Double getCgpa() {
            return cgpa;
        }

        public void setCgpa(Double cgpa) {
            this.cgpa = cgpa;
        }

        public Integer getYear() {
            return year;
        }

        public void setYear(Integer year) {
            this.year = year;
        }

        public String getSkills() {
            return skills;
        }

        public void setSkills(String skills) {
            this.skills = skills;
        }

        public String getResumeUrl() {
            return resumeUrl;
        }

        public void setResumeUrl(String resumeUrl) {
            this.resumeUrl = resumeUrl;
        }
    }

    public static class AdminStudentCreateRequest extends AuthRequests.StudentRegistrationRequest {
    }

    public static class AdminStudentUpdateRequest {
        @NotBlank
        @Size(max = 100)
        private String name;

        @NotBlank
        @Email
        @Size(max = 100)
        private String email;

        @NotBlank
        @Size(max = 50)
        private String branch;

        @NotNull
        @DecimalMin(value = "0.0")
        @DecimalMax(value = "10.0")
        private Double cgpa;

        @NotNull
        @Min(1)
        @Max(4)
        private Integer year;

        @Size(max = 2000)
        private String skills;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getBranch() {
            return branch;
        }

        public void setBranch(String branch) {
            this.branch = branch;
        }

        public Double getCgpa() {
            return cgpa;
        }

        public void setCgpa(Double cgpa) {
            this.cgpa = cgpa;
        }

        public Integer getYear() {
            return year;
        }

        public void setYear(Integer year) {
            this.year = year;
        }

        public String getSkills() {
            return skills;
        }

        public void setSkills(String skills) {
            this.skills = skills;
        }
    }
}
