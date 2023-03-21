package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.TabEntity;
import com.yourfolio.yourfolio.dtos.PortfolioDTO;
import com.yourfolio.yourfolio.dbentities.PortfolioEntity;
import com.yourfolio.yourfolio.dbentities.StyleEntity;
import com.yourfolio.yourfolio.dtos.StyleDTO;
import com.yourfolio.yourfolio.dtos.TabDTO;
import com.yourfolio.yourfolio.mappers.SectionMapper;
import com.yourfolio.yourfolio.repositories.PortfolioRepository;
import com.yourfolio.yourfolio.repositories.SectionRepository;
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
    private final SectionRepository sectionRepository;

    private final StyleMapper styleMapper;
    private final TabMapper tabMapper;
    private final SectionMapper sectionMapper;

    public PortfolioDTO getPortfolioById(Integer portfolioId) {
        PortfolioEntity portfolioEntity = portfolioRepository.getReferenceById(portfolioId);
        StyleDTO styleDTO= styleMapper.toStyleDTO(styleRepository.findByPortfolio_Id(portfolioId));
        List<TabDTO> tabDTOs = tabMapper.toTabDTOList(tabRepository.findByPortfolio_Id(portfolioId));
        tabDTOs.forEach(
                tab -> tab.setSections(
                        sectionMapper.toSectionDTOList(
                                sectionRepository.findByTab_Id(tab.getId()))));

        return PortfolioDTO.builder()
                .title(portfolioEntity.getName())
                .style(styleDTO)
                .tabs(tabDTOs)
                .build();
    }
}
