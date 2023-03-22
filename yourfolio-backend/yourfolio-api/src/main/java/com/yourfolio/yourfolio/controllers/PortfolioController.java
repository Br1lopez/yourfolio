package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.PortfolioDTO;
import com.yourfolio.yourfolio.services.PortfolioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("portfolios")
@AllArgsConstructor
public class PortfolioController {
    private final PortfolioService portfolioService;

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioDTO> getPortfolioById(@PathVariable Integer id) {
        return new ResponseEntity<>(portfolioService.getPortfolioById(id), HttpStatus.OK);
    }
}
