package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.PortfolioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioRepository extends JpaRepository<PortfolioEntity, Integer> {
}