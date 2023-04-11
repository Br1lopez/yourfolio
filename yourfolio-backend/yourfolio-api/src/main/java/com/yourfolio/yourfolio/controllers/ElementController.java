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
@CrossOrigin(origins = "*")
public class ElementController {
    private final ElementService elementService;

    @GetMapping("/{elementId}")
    public ResponseEntity<ElementDTO> getElementById(@PathVariable Integer elementId) {
        return new ResponseEntity<>(elementService.getElement(elementId), HttpStatus.OK);
    }

    @DeleteMapping("/{elementId}")
    public ResponseEntity<Boolean> deleteElementById(@PathVariable Integer elementId){
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

}
