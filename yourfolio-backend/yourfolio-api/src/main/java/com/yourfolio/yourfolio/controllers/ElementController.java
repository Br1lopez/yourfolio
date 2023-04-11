package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.services.ElementService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("elements")
@AllArgsConstructor
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class ElementController {
    private final ElementService elementService;

    @GetMapping("/{elementId}")
    public ResponseEntity<ElementDTO> getElementById(@PathVariable Integer elementId) {
        return new ResponseEntity<>(elementService.getElementById(elementId), HttpStatus.OK);
    }

}
