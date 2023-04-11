package com.yourfolio.yourfolio.repositories;


import com.yourfolio.yourfolio.dbentities.RelationshipEntity;
import com.yourfolio.yourfolio.dbentities.ids.RelationshipEntityId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RelationshipRepository extends JpaRepository<RelationshipEntity, RelationshipEntityId> {
    RelationshipEntity findByParentIdAndChildId(Integer parentId, Integer childId);

    List<RelationshipEntity> findByChildId(Integer childId);

    List<RelationshipEntity> findByParentIdOrderByPositionAsc(Integer parentId);


    @Query(value = "SELECT MAX(position) FROM element_element WHERE parent_id= :parentId", nativeQuery = true)
    Integer findMaxPosition(@Param("parentId") Integer parentId);


}