package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.ElementTypeDTO;
import com.yourfolio.yourfolio.repositories.ElementTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class ElementTypeService {
    private final ElementTypeRepository elementTypeRepository;

    public ElementTypeDTO getElementType(String elementTypeId) {
        ElementTypeEntity entity = elementTypeRepository.getReferenceById(elementTypeId);
        return ElementTypeDTO.builder()
                .id(elementTypeId)
                .name(entity.getName())
                .possibleChildren(elementTypeRepository.findChildrenByParentId(elementTypeId))
                .build();
    }
}
