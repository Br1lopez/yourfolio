package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.ImageEntity;
import com.yourfolio.yourfolio.dtos.ImageDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    ImageDTO toImageDTO(ImageEntity imageEntity);

    List<ImageDTO> toImageDTOList(List<ImageDTO> imageDTOList);
}
