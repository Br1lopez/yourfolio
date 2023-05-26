package com.yourfolio.yourfolio.repositories;


import com.yourfolio.yourfolio.dbentities.ElementRelationshipEntity;
import com.yourfolio.yourfolio.dbentities.ids.ElementRelationshipEntityId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ElementRelationshipRepository extends JpaRepository<ElementRelationshipEntity, ElementRelationshipEntityId> {
    ElementRelationshipEntity findByParentIdAndChildId(Integer parentId, Integer childId);

    List<ElementRelationshipEntity> findByChildId(Integer childId);

    List<ElementRelationshipEntity> findByParentIdOrderByPositionAsc(Integer parentId);


    @Query(value = "SELECT MAX(position) FROM element_children WHERE parent_id= :parentId", nativeQuery = true)
    Integer findMaxPosition(@Param("parentId") Integer parentId);

    long countByParentId(Integer parentId);

    List<ElementRelationshipEntity> findByParentId(Integer childId);

}