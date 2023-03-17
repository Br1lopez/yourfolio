package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dtos.SectionDTO;
import com.yourfolio.yourfolio.dbentities.SectionEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SectionMapper {
    SectionDTO toSectionDTO(SectionEntity SectionEntity);
}
