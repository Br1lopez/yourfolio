package com.yourfolio.yourfolio.infrastructure.repositories;

import com.yourfolio.yourfolio.infrastructure.dbentities.TabEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TabRepository extends JpaRepository<TabEntity, Integer> {
}