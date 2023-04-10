package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import com.yourfolio.yourfolio.dbentities.StyleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElementRepository extends JpaRepository<ElementEntity, Integer> {
    List<ElementEntity> findByPortfolio_Id(@NonNull Integer portfolioId);

    @Query(value = "SELECT MAX(position) FROM tab WHERE portfolio_id= :portfolioId", nativeQuery = true)
    Integer findMaxPosition(@Param("portfolioId") Integer portfolioId);

}