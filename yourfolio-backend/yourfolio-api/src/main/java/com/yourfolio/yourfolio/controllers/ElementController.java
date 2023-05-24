package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.ElementSaveDTO;
import com.yourfolio.yourfolio.dtos.StyleDTO;
import com.yourfolio.yourfolio.services.ElementService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("elements")
@AllArgsConstructor
public class ElementController {
    private final ElementService elementService;

    @GetMapping("/{elementId}")
    public ResponseEntity<ElementDTO> getElementById(@PathVariable Integer elementId) {
        return new ResponseEntity<>(elementService.getElement(elementId), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ElementDTO> createElement(@RequestBody ElementSaveDTO elementDto) {
        return new ResponseEntity<>(elementService.createElement(elementDto, null), HttpStatus.CREATED);
    }

    @PostMapping("/{parentId}")
    public ResponseEntity<ElementDTO> createElement(@PathVariable Integer parentId, @RequestBody ElementSaveDTO elementDto) {
        return new ResponseEntity<>(elementService.createElement(elementDto, parentId), HttpStatus.CREATED);
    }


    @PutMapping("/{elementId}")
    public ResponseEntity<ElementDTO> updateElement(@PathVariable Integer elementId, @RequestBody ElementSaveDTO elementDto) {
        return new ResponseEntity<>(elementService.updateElement(elementDto, elementId), HttpStatus.OK);
    }

    @PutMapping("/{elementId}/style")
    public ResponseEntity<StyleDTO> updateElementStyle(@PathVariable Integer elementId, @RequestBody StyleDTO styleDto) {
        return new ResponseEntity<>(elementService.updateElementStyle(styleDto, elementId), HttpStatus.OK);
    }


    @DeleteMapping("/{elementId}")
    public ResponseEntity<ElementDTO> deleteElementById(@PathVariable Integer elementId) {
        ElementDTO deletedElement = elementService.getElement(elementId);
        elementService.deleteElement(elementId);
        return new ResponseEntity<>(deletedElement, HttpStatus.OK);
    }

}
