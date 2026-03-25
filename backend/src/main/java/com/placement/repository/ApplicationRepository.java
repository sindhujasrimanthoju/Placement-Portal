package com.placement.repository;

import com.placement.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(Long studentId);
    List<Application> findByDriveId(Long driveId);
    Optional<Application> findByStudentIdAndDriveId(Long studentId, Long driveId);
    boolean existsByStudentIdAndDriveId(Long studentId, Long driveId);
}
