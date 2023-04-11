package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.RelationshipEntity;
import com.yourfolio.yourfolio.dbentities.ids.RelationshipEntityId;
import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.mappers.ElementMapper;
import com.yourfolio.yourfolio.repositories.ElementRepository;
import com.yourfolio.yourfolio.repositories.RelationshipRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class ElementService {
    private final ElementRepository elementRepository;
    private final ElementMapper elementMapper;

    private final RelationshipRepository relationshipRepository;

    public ElementDTO getElement(Integer elementId) {
        return elementMapper.toDto(elementRepository.getReferenceById(elementId));
    }

    public void deleteElement(Integer elementId) {
        for (RelationshipEntity relationship : relationshipRepository.findByChildId(elementId)){
            relationshipRepository.delete(relationship);
        }
        elementRepository.deleteById(elementId);
    }

    public void removeChild(Integer parentId, Integer childId){
        relationshipRepository.deleteById(RelationshipEntityId.builder()
                .parentId(parentId)
                .childId(childId)
                .build());
    }
}
