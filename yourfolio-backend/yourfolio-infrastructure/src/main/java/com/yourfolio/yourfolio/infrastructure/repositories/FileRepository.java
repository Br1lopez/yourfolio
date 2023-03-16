package com.yourfolio.yourfolio.infrastructure.repositories;

import com.yourfolio.yourfolio.infrastructure.dbentities.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Integer> {
}