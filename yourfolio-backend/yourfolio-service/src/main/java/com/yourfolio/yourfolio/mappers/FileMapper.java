package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dtos.FileDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FileMapper {
    FileDTO toFileDTO(FileDTO fileDTO);

    List<FileDTO> toFileDTOList(List<FileDTO> fileDTOList);
}
