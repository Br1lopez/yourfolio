package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.daos.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Integer> {
}