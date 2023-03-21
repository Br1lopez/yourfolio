package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.SectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectionRepository extends JpaRepository<SectionEntity, Integer> {
    List<SectionEntity> findByTab_Id(Integer id);

    List<SectionEntity> findByTab_Portfolio_Id(Integer id);

}