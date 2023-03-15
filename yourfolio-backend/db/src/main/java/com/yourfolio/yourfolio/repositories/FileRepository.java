package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.daos.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Integer> {
}