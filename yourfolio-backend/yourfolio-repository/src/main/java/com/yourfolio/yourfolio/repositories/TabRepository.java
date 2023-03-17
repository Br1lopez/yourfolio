package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.TabEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface TabRepository extends JpaRepository<TabEntity, Integer> {
    List<TabEntity> findByPortfolioEntity_Id(@NonNull Integer id);

}