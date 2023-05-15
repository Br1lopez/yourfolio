package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElementRepository extends JpaRepository<ElementEntity, Integer> {



}