package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
}