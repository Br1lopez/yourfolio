package com.yourfolio.yourfolio.repositories;


import com.yourfolio.yourfolio.dbentities.RelationshipEntity;
import com.yourfolio.yourfolio.dbentities.ids.RelationshipEntityId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RelationshipRepository extends JpaRepository<RelationshipEntity, RelationshipEntityId> {
    RelationshipEntity findByParentIdAndChildId(Integer parentId, Integer childId);

    List<RelationshipEntity> findByChildId(Integer childId);

    List<RelationshipEntity> findByParentIdOrderByPositionAsc(Integer parentId);


}