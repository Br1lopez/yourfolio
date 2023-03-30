package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.TabEntity;
import com.yourfolio.yourfolio.dtos.TabDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TabMapper {
    TabDTO toTabDTO(TabEntity tabEntity);
    List<TabDTO> toTabDTOList(List<TabEntity> tabEntities);

    TabEntity toTabEntity(TabDTO tabDTO);
}
