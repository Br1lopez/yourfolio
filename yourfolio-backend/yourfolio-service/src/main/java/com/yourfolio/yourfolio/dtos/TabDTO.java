package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.util.List;
@Data
public class TabDTO {
    private String name;
    private Integer id;
    private List<SectionDTO> sections;
}
