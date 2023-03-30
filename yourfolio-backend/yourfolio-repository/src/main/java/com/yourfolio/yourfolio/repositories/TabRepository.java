package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.TabEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import java.util.List;

public interface TabRepository extends JpaRepository<TabEntity, Integer> {
    List<TabEntity> findByPortfolio_Id(@NonNull Integer portfolioId);

    @Query(value = "SELECT MAX(tab_position) FROM tab WHERE portfolio_id= :portfolioId", nativeQuery = true)
    Integer findMaxPosition(@Param("portfolioId") Integer portfolioId);

}