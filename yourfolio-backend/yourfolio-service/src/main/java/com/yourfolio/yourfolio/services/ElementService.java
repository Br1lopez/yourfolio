package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
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
        return setChildrenPosition(elementRepository.getReferenceById(elementId));

    }

    public ElementDTO setChildrenPosition (ElementEntity elementEntity) {
        //TODO: Hacerlo recursivo
        ElementDTO elementDTO = elementMapper.toDto(elementEntity);

        elementDTO.getElements().stream().forEach(
                e -> e.setPosition(relationshipRepository.findByParentIdAndChildId(elementDTO.getId(), e.getId()).getPosition())
        );

        return elementDTO;
    }

    public ElementDTO saveElement(ElementDTO elementDTO, Integer parentId){
        ElementEntity response = elementRepository.save(elementMapper.toEntity(elementDTO));

        if (parentId!=null){
            Integer maxPos = relationshipRepository.findMaxPosition(parentId);
            if (maxPos == null)
                maxPos = 0;
            relationshipRepository.save(
                    RelationshipEntity.builder()
                            .parentId(parentId)
                            .childId(response.getId())
                            .position(maxPos + 1)
                            .build()
            );
        }

        return elementMapper.toDto(response);
    }

    public ElementDTO updateElement(ElementDTO elementDTO, Integer elementId) {
        elementDTO.setId(elementId);
        ElementEntity response = elementRepository.save(elementMapper.toEntity(elementDTO));
        return elementMapper.toDto(response);
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
