package com.yourfolio.repositories;

import com.yourfolio.daos.Section;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, Integer> {
}