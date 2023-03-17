package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dtos.ProjectDTO;
import com.yourfolio.yourfolio.dbentities.ProjectEntity;
import org.mapstruct.Mapper;

@Mapper
public interface ProjectMapper {
    ProjectDTO toProjectDTO(ProjectEntity projectEntity);
}
