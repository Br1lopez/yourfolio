package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
    List<ProjectEntity> findBySections_Id(@NonNull Integer id);

}