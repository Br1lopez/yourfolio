package com.yourfolio.yourfolio.infrastructure.repositories;

import com.yourfolio.yourfolio.infrastructure.dbentities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
}