package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.util.List;

@Data
public class PortfolioDTO {
    private String title;
    private StyleDTO style;
    private List<TabDTO> tabs;
}
