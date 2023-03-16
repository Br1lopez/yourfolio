package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.util.List;
@Data
public class SectionDTO {
    private String name;
    private String id;
    private List<ProjectDTO> projects;
}
