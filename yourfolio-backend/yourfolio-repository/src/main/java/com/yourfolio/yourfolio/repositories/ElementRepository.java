package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElementRepository extends JpaRepository<ElementEntity, Integer> {
    List<ElementEntity> findByUser_EmailAndType_Id(String userEmail, String typeId);

    List<ElementEntity> findByUser_IdAndType_Id(Integer userId, String typeId);



}