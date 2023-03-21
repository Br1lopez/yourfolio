package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.util.List;
@Data
public class SectionDTO {
    private String name;
    private Integer id;
    private List<ProjectDTO> projects;
}
