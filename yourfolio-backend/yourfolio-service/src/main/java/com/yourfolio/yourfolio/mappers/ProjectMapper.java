package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.ProjectEntity;
import com.yourfolio.yourfolio.dtos.ProjectDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    ProjectDTO toProjectDTO(ProjectEntity projectEntity);

    List<ProjectDTO> toProjectDTOList(List<ProjectEntity> projectEntityList);
}
