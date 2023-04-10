package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.services.ElementService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("portfolios")
@AllArgsConstructor
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class ElementController {
    private final ElementService elementService;

    @GetMapping("/{portfolioId}")
    public ResponseEntity<ElementDTO> getPortfolioById(@PathVariable Integer portfolioId) {
        return new ResponseEntity<>(elementService.getElementById(portfolioId), HttpStatus.OK);
    }

    //TODO: addTabToPortfolio
}
