package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.TabEntity;
import com.yourfolio.yourfolio.dtos.PortfolioDTO;
import com.yourfolio.yourfolio.dbentities.PortfolioEntity;
import com.yourfolio.yourfolio.dbentities.StyleEntity;
import com.yourfolio.yourfolio.repositories.PortfolioRepository;
import com.yourfolio.yourfolio.repositories.StyleRepository;
import com.yourfolio.yourfolio.repositories.TabRepository;
import com.yourfolio.yourfolio.mappers.StyleMapper;
import com.yourfolio.yourfolio.mappers.TabMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
@AllArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final StyleRepository styleRepository;
    private final TabRepository tabRepository;

    private final StyleMapper styleMapper;
    private final TabMapper tabMapper;

    public PortfolioDTO getPortfolioById(Integer portfolioId) {
        PortfolioEntity portfolioEntity = portfolioRepository.getReferenceById(portfolioId);
        StyleEntity styleEntity = styleRepository.findByPortfolio_Id(portfolioId);
        List<TabEntity> tabEntities = (tabRepository.findByPortfolio_Id(portfolioId));
        return PortfolioDTO.builder()
                .title(portfolioEntity.getName())
                .style(styleMapper.toStyleDTO(styleEntity))
                .tabs(tabMapper.toTabDTOList(tabEntities))
                .build();
    }
}
