package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.SectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<SectionEntity, Integer> {
}