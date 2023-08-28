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

    private final UserRepository userRepository;

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

    public ElementDTO createElement(ElementSaveDTO elementDTO, Integer parentId, String userEmail) {
        return saveElement(elementDTO, null, parentId, userEmail);
    }

    public ElementDTO changeElementName(Integer elementId, String newName){
        ElementEntity elementToSave = elementRepository.getReferenceById(elementId);
        elementToSave.setName(newName);
        return elementMapper.toDto(elementRepository.save(elementToSave));
    }

    public ElementDTO saveElement(ElementSaveDTO elementDTO, Integer elementId, Integer parentId, String userEmail) {
        // Creamos la entidad a guardar a partir del DTO
        ElementEntity elementToSave = elementMapper.toEntity(elementDTO);

        //Si la id no es nula, vamos a actualizar (seteando el id de la entidad).
        if (elementId != null) {
            elementToSave.setId(elementId);
            ElementEntity existingElement = elementRepository.findById(elementId).orElseThrow(() -> new RuntimeException("Element not found"));
            elementToSave.setElements(existingElement.getElements());
        }

        boolean hasFiles = elementDTO.getFiles() != null && !elementDTO.getFiles().isEmpty();


        // TIPO:
        ElementTypeEntity elementTypeToSave = ElementTypeEntity.builder()
                .id(elementDTO.getTypeId())
                .build();
        elementToSave.setType(elementTypeToSave);

        // USUARIO:
        if (userEmail != null)
            elementToSave.setUser(userRepository.findByEmail(userEmail));

        // ARCHIVOS:
        Set<FileEntity> filesToSave = new HashSet<>();
        if (hasFiles) {
            elementDTO.getFiles().forEach(fileDTO ->
                    filesToSave.add(
                            fileDTO.getId() == null ?
                                    fileRepository.save(fileMapper.toEntity(fileDTO))
                                    : fileMapper.toEntity(fileDTO)));
        }
        elementToSave.setFiles(filesToSave);

        //Si se enciende home, apagar en los hermanos:
        if (elementDTO.isHome() && parentId != null){
            elementRepository.getReferenceById(parentId).getElements().forEach(
                    sibling -> {
                        if (sibling.isHome()){
                            sibling.setHome(false);
                            elementRepository.save(sibling);
                        }
                    }
            );
        }

        // GUARDADO DEL ELEMENTO:
        ElementEntity response = elementRepository.save(elementToSave);

        // ESTILO:

        if (elementDTO.getStyle() == null) {
            styleRepository.save(
                    StyleEntity
                            .builder()
                            .portfolio(response)
                            .bgColor("#e4e7eb")
                            .fontColor("black")
                            .fontFamily("Montserrat")
                            .build());
        }

            // TABLAS N:M
            if (parentId != null &&
                    elementRelationshipRepository.findByParentIdAndChildId(parentId, response.getId()) == null) {
                elementRelationshipRepository.save(
                        ElementRelationshipEntity.builder()
                                .parentId(parentId)
                                .childId(response.getId())
                                .position((int) elementRelationshipRepository.countByParentId(parentId) + 1)
                                .build());
            }

            elementToSave.getFiles().forEach(savedFile -> {
                if (elementFileRepository.findByFileIdAndElementId(savedFile.getId(), response.getId()) == null) {

                    elementFileRepository.save(
                            ElementFileEntity.builder()
                                    .elementId(response.getId())
                                    .fileId(savedFile.getId())
                                    .build());
                }
            });

            response.setType(elementTypeRepository.getReferenceById(elementTypeToSave.getId()));

            return elementMapper.toDto(response);
        }

        public ElementDTO updateElement (ElementSaveDTO elementDTO, Integer elementId){
            List<ElementRelationshipEntity> elementRelationshipEntities =
                    elementRelationshipRepository.findByChildId(elementId);
            Integer parentId = null;
            if (elementRelationshipEntities != null && elementRelationshipEntities.size() > 0){
                parentId = elementRelationshipEntities.get(0).getParentId();
            }
            return saveElement(elementDTO, elementId, parentId, null);
        }

        public StyleDTO updateElementStyle (StyleDTO styleDto, Integer elementId){
            int styleId = styleRepository.findByPortfolio_Id(elementId).getId();
            StyleEntity styleEntitytoSave = styleMapper.toEntity(styleDto);
            styleEntitytoSave.setId(styleId);
            styleEntitytoSave.setPortfolio(ElementEntity.builder().id(elementId).build());
            return styleMapper.toDto(styleRepository.save(styleEntitytoSave));
        }

        public void deleteElement (Integer elementId){
            for (ElementRelationshipEntity relationship : elementRelationshipRepository.findByChildId(elementId)) {
                elementRelationshipRepository.delete(relationship);
            }
            elementRepository.deleteById(elementId);
        }

        public void removeChild (Integer parentId, Integer childId){
            elementRelationshipRepository.deleteById(ElementRelationshipEntityId.builder()
                    .parentId(parentId)
                    .childId(childId)
                    .build());
        }


    }
