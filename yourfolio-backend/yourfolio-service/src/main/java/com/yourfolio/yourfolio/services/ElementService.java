package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import com.yourfolio.yourfolio.dbentities.ElementRelationshipEntity;
import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import com.yourfolio.yourfolio.dbentities.StyleEntity;
import com.yourfolio.yourfolio.dbentities.ids.ElementRelationshipEntityId;
import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.ElementSaveDTO;
import com.yourfolio.yourfolio.dtos.ElementTypeDTO;
import com.yourfolio.yourfolio.mappers.ElementMapper;
import com.yourfolio.yourfolio.mappers.StyleMapper;
import com.yourfolio.yourfolio.repositories.ElementRepository;
import com.yourfolio.yourfolio.repositories.ElementRelationshipRepository;
import com.yourfolio.yourfolio.repositories.ElementTypeRepository;
import com.yourfolio.yourfolio.repositories.StyleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class ElementService {
    private final ElementRepository elementRepository;
    private final ElementMapper elementMapper;
    private final ElementRelationshipRepository elementRelationshipRepository;

    private final ElementTypeRepository elementTypeRepository;
    private final StyleRepository styleRepository;

    private final StyleMapper styleMapper;

    public ElementDTO getElement(Integer elementId) {
        ElementDTO result = elementMapper.toDto(elementRepository.getReferenceById(elementId));

        setChildrenPosition(result);

        setTypeRecursively(result);

        return result;

    }

    public void setChildrenPosition(ElementDTO elementDTO) {
        elementDTO.getElements().stream().forEach(
                e -> {
                    e.setPosition(elementRelationshipRepository.findByParentIdAndChildId(elementDTO.getId(), e.getId()).getPosition());
                    if (e.getElements() != null && !e.getElements().isEmpty()) {
                        setChildrenPosition(e);
                    }
                }
        );
    }

    public void setType(ElementDTO elementDTO) {
        if (elementDTO.getType() != null) {
            ElementTypeDTO type = elementDTO.getType();
            type.setPossibleChildren(elementTypeRepository.findChildrenByParentId(type.getId()));
            elementDTO.setType(type);
            if (elementDTO.getType().getPossibleChildren() != null && !elementDTO.getType().getPossibleChildren().isEmpty()) {
                setChildrenPosition(elementDTO);
            }
        }
    }

    public void setTypeRecursively(ElementDTO elementDTO) {
        setType(elementDTO);
        elementDTO.getElements().forEach(
                this::setType
        );
    }

    public ElementDTO createElement(ElementSaveDTO elementDTO, Integer parentId) {
        ElementEntity elementToSave = elementMapper.toEntity(elementDTO);
        elementToSave.setType(
                ElementTypeEntity.builder()
                        .id(elementDTO.getTypeId())
                        .build());

        ElementEntity response = elementRepository.save(elementToSave);

        if (parentId != null) {
            Integer maxPos = elementRelationshipRepository.getChildrenCount(parentId) + 1;
            elementRelationshipRepository.save(
                    ElementRelationshipEntity.builder()
                            .parentId(parentId)
                            .childId(response.getId())
                            .position(maxPos + 1)
                            .build()
            );
        }

        return elementMapper.toDto(response);
    }

    public ElementDTO updateElement(ElementSaveDTO elementDTO, Integer elementId) {
        ElementEntity entityToSave = elementRepository.getReferenceById(elementId);
        entityToSave.setName(elementDTO.getName());

        StyleEntity styleToSave = entityToSave.getStyle();
        styleToSave.setBgColor(elementDTO.getStyle().getBgColor());
        styleToSave.setFontColor(elementDTO.getStyle().getFontColor());
        styleToSave.setFontFamily(elementDTO.getStyle().getFontFamily());

        entityToSave.setStyle(styleToSave);


        return elementMapper.toDto(elementRepository.save(entityToSave));
    }

    public void deleteElement(Integer elementId) {
        for (ElementRelationshipEntity relationship : elementRelationshipRepository.findByChildId(elementId)) {
            elementRelationshipRepository.delete(relationship);
        }
        elementRepository.deleteById(elementId);
    }

    public void removeChild(Integer parentId, Integer childId) {
        elementRelationshipRepository.deleteById(ElementRelationshipEntityId.builder()
                .parentId(parentId)
                .childId(childId)
                .build());
    }
}
