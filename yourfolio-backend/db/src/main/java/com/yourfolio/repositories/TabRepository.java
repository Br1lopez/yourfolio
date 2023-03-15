package com.yourfolio.repositories;

import com.yourfolio.daos.Tab;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TabRepository extends JpaRepository<Tab, Integer> {
}