package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dtos.PortfolioDTO;
import com.yourfolio.yourfolio.mappers.*;
import com.yourfolio.yourfolio.repositories.*;
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
