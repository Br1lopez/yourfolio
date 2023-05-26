package com.yourfolio.yourfolio.repositories;


import com.yourfolio.yourfolio.dbentities.ElementFileEntity;
import com.yourfolio.yourfolio.dbentities.ElementRelationshipEntity;
import com.yourfolio.yourfolio.dbentities.ids.ElementFileEntityId;
import com.yourfolio.yourfolio.dbentities.ids.ElementRelationshipEntityId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ElementFileRepository extends JpaRepository<ElementFileEntity, ElementFileEntityId> {
    ElementFileEntity findByFileIdAndElementId(Integer fileId, Integer elementId);

}