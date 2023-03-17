package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
}