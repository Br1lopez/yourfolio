package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.daos.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
}