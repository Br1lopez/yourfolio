package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.lang.annotation.ElementType;
import java.util.List;

@Repository
public interface ElementTypeRepository extends JpaRepository<ElementTypeEntity, String> {


    @Query("SELECT et FROM ElementTypeEntity et WHERE et.id IN (SELECT etc.childId FROM ElementTypeRelationshipEntity etc WHERE etc.parentId = :parentIdIn)")
    List<ElementTypeEntity> findChildrenByParentId(@Param("parentIdIn") String parentIdVar);
}