package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dtos.SectionDTO;
import com.yourfolio.yourfolio.dbentities.SectionEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SectionMapper {
    SectionDTO toSectionDTO(SectionEntity sectionEntity);
    List<SectionDTO> toSectionDTOList(List<SectionEntity> sectionEntityList);
}
