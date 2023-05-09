package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import com.yourfolio.yourfolio.dtos.ElementTypeDTO;
import com.yourfolio.yourfolio.repositories.ElementTypeRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ElementTypeMapper {


    ElementTypeEntity toEntity(ElementTypeDTO elementTypeDTO);

    ElementTypeDTO toDto(ElementTypeEntity elementTypeEntity, @Context ElementTypeRepository elementTypeRepository);


    @AfterMapping
    default void toDto(@MappingTarget ElementTypeDTO target, ElementTypeEntity elementTypeEntity, @Context ElementTypeRepository elementTypeRepository) {
        target.setPossibleChildren(elementTypeRepository.findChildrenByParentId(elementTypeEntity.getId()));
    }
}