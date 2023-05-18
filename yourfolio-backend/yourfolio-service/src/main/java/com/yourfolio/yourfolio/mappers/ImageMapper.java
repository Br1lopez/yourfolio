package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dtos.ImageDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    ImageDTO toFileDTO(ImageDTO imageDTO);

    List<ImageDTO> toFileDTOList(List<ImageDTO> imageDTOList);
}
