package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import com.yourfolio.yourfolio.dtos.ElementDTO;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ElementMapper {
    ElementEntity toEntity(ElementDTO elementDTO);

    ElementDTO toDto(ElementEntity elementEntity);

}