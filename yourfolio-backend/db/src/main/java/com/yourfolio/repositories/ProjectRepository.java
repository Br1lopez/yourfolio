package com.yourfolio.repositories;

import com.yourfolio.daos.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
}