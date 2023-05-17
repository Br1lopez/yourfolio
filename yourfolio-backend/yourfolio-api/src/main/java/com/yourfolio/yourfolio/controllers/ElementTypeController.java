package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.ElementDTO;
import com.yourfolio.yourfolio.dtos.ElementTypeDTO;
import com.yourfolio.yourfolio.services.ElementTypeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("elementTypes")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ElementTypeController {
    private final ElementTypeService elementTypeService;

    @GetMapping("/{elementTypeId}")
    public ResponseEntity<ElementTypeDTO> getElementById(@PathVariable String elementTypeId) {
        return new ResponseEntity<>(elementTypeService.getElementType(elementTypeId), HttpStatus.OK);
    }
}
