package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.*;
import com.yourfolio.yourfolio.dbentities.ids.ElementRelationshipEntityId;
import com.yourfolio.yourfolio.dtos.*;
import com.yourfolio.yourfolio.mappers.ElementMapper;
import com.yourfolio.yourfolio.mappers.FileMapper;
import com.yourfolio.yourfolio.mappers.StyleMapper;
import com.yourfolio.yourfolio.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@AllArgsConstructor
public class ElementService {
    private final ElementRepository elementRepository;
    private final ElementMapper elementMapper;
    private final StyleMapper styleMapper;
    private final ElementRelationshipRepository elementRelationshipRepository;
    private final ElementTypeRepository elementTypeRepository;
    private final StyleRepository styleRepository;
    private final ElementFileRepository elementFileRepository;
    private final FileRepository fileRepository;
    private final FileMapper fileMapper;

    public ElementDTO getElement(Integer elementId) {
        ElementDTO result = elementMapper.toDto(elementRepository.getReferenceById(elementId));

        setChildrenPosition(result);

        setTypeRecursively(result);

        return result;

    }

    public void setChildrenPosition(ElementDTO elementDTO) {
        if (elementDTO.getElements() != null) {
            elementDTO.getElements().forEach(
                    e -> {
                        e.setPosition(elementRelationshipRepository.findByParentIdAndChildId(elementDTO.getId(), e.getId()).getPosition());
                        if (e.getElements() != null && !e.getElements().isEmpty()) {
                            setChildrenPosition(e);
                        }
                    }
            );
        }
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
        if (elementDTO.getElements() != null) {
            elementDTO.getElements().forEach(
                    this::setType
            );
        }
    }

    public ElementDTO createElement(ElementSaveDTO elementDTO, Integer parentId) {
        boolean hasFiles = elementDTO.getFiles() != null && !elementDTO.getFiles().isEmpty();
        ElementEntity elementToSave = elementMapper.toEntity(elementDTO);
        ElementTypeEntity elementTypeToSave = ElementTypeEntity.builder()
                .id(elementDTO.getTypeId())
                .build();
        elementToSave.setType(elementTypeToSave);

        Set<FileEntity> filesToSave = new HashSet<>();
        if (hasFiles) {
            elementDTO.getFiles().forEach(fileDTO ->
                    filesToSave.add(fileRepository.save(fileMapper.toEntity(fileDTO))));
        }
        elementToSave.setFiles(filesToSave);

        ElementEntity response = elementRepository.save(elementToSave);

        if (parentId != null) {
            elementRelationshipRepository.save(
                    ElementRelationshipEntity.builder()
                            .parentId(parentId)
                            .childId(response.getId())
                            .position((int) elementRelationshipRepository.countByParentId(parentId) + 1)
                            .build());
        }

        elementToSave.getFiles().forEach(savedFile ->
                elementFileRepository.save(
                        ElementFileEntity.builder()
                                .elementId(response.getId())
                                .fileId(savedFile.getId())
                                .build()));

        response.setType(elementTypeRepository.getReferenceById(elementTypeToSave.getId()));

        return elementMapper.toDto(response);
    }

    public ElementDTO updateElement(ElementSaveDTO elementDTO, Integer elementId) {
        ElementEntity currentEntity = elementRepository.getReferenceById(elementId);
        ElementEntity entityToSave = elementMapper.toEntity(elementDTO);
        entityToSave.setId(elementId);
        entityToSave.setElements(currentEntity.getElements());

        return elementMapper.toDto(elementRepository.save(entityToSave));
    }

    public StyleDTO updateElementStyle(StyleDTO styleDto, Integer elementId) {
        int styleId = styleRepository.findByPortfolio_Id(elementId).getId();
        StyleEntity styleEntitytoSave = styleMapper.toEntity(styleDto);
        styleEntitytoSave.setId(styleId);
        styleEntitytoSave.setPortfolio(ElementEntity.builder().id(elementId).build());
        return styleMapper.toDto(styleRepository.save(styleEntitytoSave));
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
