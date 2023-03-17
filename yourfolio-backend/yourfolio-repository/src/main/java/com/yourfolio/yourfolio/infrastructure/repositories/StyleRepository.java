package com.yourfolio.yourfolio.infrastructure.repositories;

import com.yourfolio.yourfolio.infrastructure.dbentities.StyleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StyleRepository extends JpaRepository<StyleEntity, Integer> {
}