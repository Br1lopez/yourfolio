package com.yourfolio.yourfolio.services;

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
        StyleEntity styleEntity = styleRepository.findByPortfolioEntity_Id(portfolioId);
        System.out.println(tabRepository.findByPortfolioEntity_Id(portfolioId));
        System.out.println(tabMapper.toTabDTOList(tabRepository.findByPortfolioEntity_Id(portfolioId)));
        return PortfolioDTO.builder()
                .title(portfolioEntity.getName())
                .style(styleMapper.toStyleDTO(styleEntity))
                .tabs(tabMapper.toTabDTOList(tabRepository.findByPortfolioEntity_Id(portfolioId)))
                .build();
    }
}
