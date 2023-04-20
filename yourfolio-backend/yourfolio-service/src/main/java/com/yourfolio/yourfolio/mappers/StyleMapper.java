package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.StyleEntity;
import com.yourfolio.yourfolio.dtos.StyleDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StyleMapper {
    StyleDTO toDto(StyleEntity styleEntity);

    StyleEntity toEntity(StyleDTO styleDTO);
}
