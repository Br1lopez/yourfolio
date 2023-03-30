package com.yourfolio.yourfolio.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class TabDTO {
    private String name;
    private Integer id;

    private Integer position;
    private List<SectionDTO> sections;
}
