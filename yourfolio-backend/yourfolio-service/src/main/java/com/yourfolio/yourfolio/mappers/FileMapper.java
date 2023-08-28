package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.FileEntity;
import com.yourfolio.yourfolio.dtos.FileDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FileMapper {
    FileDTO toDto(FileEntity fileEntity);

    FileEntity toEntity(FileDTO fileDTO);

    List<FileDTO> toDtoList(List<FileDTO> fileDTOList);
}
