package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dtos.TabDTO;
import com.yourfolio.yourfolio.dbentities.TabEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TabMapper {
    TabDTO toTabDTO(TabEntity TabEntity);
    List<TabDTO> toTabDTOList(List<TabEntity> tabEntities);
}
