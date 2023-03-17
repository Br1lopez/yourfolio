package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Integer> {
}