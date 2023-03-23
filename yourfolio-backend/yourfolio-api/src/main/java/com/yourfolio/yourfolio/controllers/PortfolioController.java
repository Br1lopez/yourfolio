package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.PortfolioDTO;
import com.yourfolio.yourfolio.services.PortfolioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("portfolios")
@AllArgsConstructor
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class PortfolioController {
    private final PortfolioService portfolioService;

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioDTO> getPortfolioById(@PathVariable Integer id) {
        return new ResponseEntity<>(portfolioService.getPortfolioById(id), HttpStatus.OK);
    }

    //TODO: addTabToPortfolio
}
