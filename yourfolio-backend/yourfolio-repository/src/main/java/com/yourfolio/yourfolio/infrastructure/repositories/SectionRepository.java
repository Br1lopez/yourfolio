package com.yourfolio.yourfolio.infrastructure.repositories;

import com.yourfolio.yourfolio.infrastructure.dbentities.SectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<SectionEntity, Integer> {
}