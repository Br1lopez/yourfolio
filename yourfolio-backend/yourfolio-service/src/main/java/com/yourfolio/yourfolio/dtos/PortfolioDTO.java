package com.yourfolio.yourfolio.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PortfolioDTO {
    private String name;
    private StyleDTO style;
    private List<TabDTO> tabs;
}
