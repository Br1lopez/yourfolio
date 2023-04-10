package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.mappers.ElementMapper;
import com.yourfolio.yourfolio.repositories.ElementRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class ElementService {
    private final ElementRepository elementRepository;
    private final ElementMapper elementMapper;

    public ElementDTO getElementById(Integer elementId) {
        return elementMapper.toDto(elementRepository.getReferenceById(elementId));
    }
}
