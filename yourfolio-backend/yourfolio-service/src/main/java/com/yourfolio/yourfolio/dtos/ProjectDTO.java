package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.util.Set;

@Data
public class ProjectDTO {
    private String id;
    private String name;
    private String description;
    private Set<FileDTO> files;
}
