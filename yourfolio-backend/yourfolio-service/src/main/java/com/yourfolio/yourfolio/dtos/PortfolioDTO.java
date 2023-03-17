package com.yourfolio.yourfolio.dtos;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatusCode;

import java.util.List;

@Data
@Builder
public class PortfolioDTO {
    private String title;
    private StyleDTO style;
    private List<TabDTO> tabs;
}
