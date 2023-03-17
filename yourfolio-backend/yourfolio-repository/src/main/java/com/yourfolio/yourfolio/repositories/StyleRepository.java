package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.StyleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface StyleRepository extends JpaRepository<StyleEntity, Integer> {
    StyleEntity findByPortfolioEntity_Id(@NonNull Integer id);

}