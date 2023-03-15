package com.yourfolio.repositories;

import com.yourfolio.daos.Style;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StyleRepository extends JpaRepository<Style, Integer> {
}