package com.yourfolio.yourfolio.mappers;

import com.yourfolio.yourfolio.dbentities.PortfolioEntity;
import com.yourfolio.yourfolio.dtos.PortfolioDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PortfolioMapper {
    PortfolioDTO toPortfolioDTO(PortfolioEntity portfolioEntity);

    List<PortfolioDTO> toPortfolioDTOList(List<PortfolioEntity> portfolioEntityList);
}
