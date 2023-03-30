package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.PortfolioEntity;
import com.yourfolio.yourfolio.dbentities.TabEntity;
import com.yourfolio.yourfolio.dtos.TabDTO;
import com.yourfolio.yourfolio.dtos.TabSaveDTO;
import com.yourfolio.yourfolio.mappers.TabMapper;
import com.yourfolio.yourfolio.repositories.TabRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class TabService {
    private final TabMapper tabMapper;
    private final TabRepository tabRepository;

    public TabDTO createTabInPortfolio(Integer portfolioId, TabSaveDTO tabSaveDTO) {
        return tabMapper.toTabDTO(
                tabRepository.save(
                TabEntity.builder()
                        .portfolio(PortfolioEntity.builder()
                                .id(portfolioId)
                                .build())
                        .position(tabRepository.findMaxPosition(portfolioId) + 1)
                        .name(tabSaveDTO.getName())
                        .build()));
    }
}
