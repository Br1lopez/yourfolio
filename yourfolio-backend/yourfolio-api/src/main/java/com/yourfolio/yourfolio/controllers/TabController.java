package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.TabDTO;
import com.yourfolio.yourfolio.dtos.TabSaveDTO;
import com.yourfolio.yourfolio.services.TabService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("portfolios")
@AllArgsConstructor
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class TabController {
    TabService tabService;

    @PostMapping("/{portfolioId}/tabs")
    public ResponseEntity<TabDTO> createTabInPortfolio(@PathVariable Integer portfolioId, @RequestBody TabSaveDTO tab) {
        return new ResponseEntity<>(tabService.createTabInPortfolio(portfolioId, tab), HttpStatus.CREATED);
    }

    @DeleteMapping("/{tabId}")
    public void deleteTab(@PathVariable Integer tabId){
        tabService.deleteTab(tabId);
    }
}
