package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import com.yourfolio.yourfolio.dbentities.ElementTypeEntity;
import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.ElementSaveDTO;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ElementMapper {

    @Mapping(source = "typeId", target = "type", qualifiedByName = "typeIdToType")

    ElementEntity toEntity(ElementSaveDTO elementDTO);

    ElementDTO toDto(ElementEntity elementEntity);

    @Named("typeIdToType")
    default ElementTypeEntity typeIdToType(String typeId) {
        ElementTypeEntity type = new ElementTypeEntity();
        type.setId(typeId);
        return type;
    }
}