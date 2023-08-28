package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.ElementSaveDTO;
import com.yourfolio.yourfolio.mappers.ElementMapper;
import com.yourfolio.yourfolio.repositories.ElementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class TabService {
    private final ElementMapper elementMapper;
    private final ElementRepository elementRepository;

    public ElementDTO createTabInPortfolio(Integer portfolioId, ElementSaveDTO tabSaveDTO) {

        return elementMapper.toDto(
                elementRepository.save(
                        ElementEntity.builder()
                                .name(tabSaveDTO.getName())
                                .build()));
    }

    public void deleteTab(Integer tabId) {
        //TODO: comprobar que esa tab es de tu repositorio
        elementRepository.deleteById(tabId);
    }
}
