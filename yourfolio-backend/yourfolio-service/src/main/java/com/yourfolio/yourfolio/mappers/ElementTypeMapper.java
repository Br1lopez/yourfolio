package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import com.yourfolio.yourfolio.dtos.ElementTypeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ElementTypeMapper {
    ElementTypeEntity toEntity(ElementTypeDTO ElementTypeDTO);

    ElementTypeDTO toDto(ElementTypeEntity ElementTypeEntity);

}