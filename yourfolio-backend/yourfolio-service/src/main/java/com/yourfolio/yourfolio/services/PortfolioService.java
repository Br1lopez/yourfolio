package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.TabEntity;
import com.yourfolio.yourfolio.dtos.PortfolioDTO;
import com.yourfolio.yourfolio.dbentities.PortfolioEntity;
import com.yourfolio.yourfolio.dbentities.StyleEntity;
import com.yourfolio.yourfolio.dtos.StyleDTO;
import com.yourfolio.yourfolio.dtos.TabDTO;
import com.yourfolio.yourfolio.mappers.*;
import com.yourfolio.yourfolio.repositories.*;
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
    private final ProjectRepository projectRepository;

    private final StyleMapper styleMapper;
    private final TabMapper tabMapper;
    private final SectionMapper sectionMapper;
    private final ProjectMapper projectMapper;

    private final PortfolioMapper portfolioMapper;

    public PortfolioDTO getPortfolioById(Integer portfolioId) {
        return portfolioMapper.toPortfolioDTO(portfolioRepository.getReferenceById(portfolioId));
    }
}
