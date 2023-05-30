package com.yourfolio.yourfolio.repositories;


import com.yourfolio.yourfolio.dbentities.ElementRelationshipEntity;
import com.yourfolio.yourfolio.dbentities.ids.ElementRelationshipEntityId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ElementRelationshipRepository extends JpaRepository<ElementRelationshipEntity, ElementRelationshipEntityId> {

    /* JPA ofrece métodos por defecto para operaciones básicas como guardar o leer,
    pero permite que se le agreguen funcionalidades de diversas formas: */

    // Aquí JPA crea la query personalizada a partir del nombre
    List<ElementRelationshipEntity> findByParentIdOrderByPositionAsc(Integer parentId);

    // Aquí se le ha indicado la query a mano
    @Query(value = "SELECT MAX(position) FROM element_children WHERE parent_id= :parentId", nativeQuery = true)
    Integer findMaxPosition(@Param("parentId") Integer parentId);

    ElementRelationshipEntity findByParentIdAndChildId(Integer parentId, Integer childId);

    List<ElementRelationshipEntity> findByChildId(Integer childId);

    long countByParentId(Integer parentId);

    List<ElementRelationshipEntity> findByParentId(Integer childId);

}