package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.PortfolioDTO;
import com.yourfolio.yourfolio.dtos.TabDTO;
import com.yourfolio.yourfolio.services.TabService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("portfolios/{portfolioId}/tabs")
@AllArgsConstructor
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class TabController {
    TabService tabService;

    @PostMapping("")
    public ResponseEntity<TabDTO> createTabInPortfolio(@PathVariable Integer portfolioId, @RequestBody TabDTO tab) {
        return new ResponseEntity<>(tabService.createTabInPortfolio(portfolioId, tab), HttpStatus.CREATED);
    }
}
