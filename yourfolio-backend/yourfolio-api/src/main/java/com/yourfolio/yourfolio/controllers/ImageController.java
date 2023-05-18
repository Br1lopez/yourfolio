package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.ElementTypeDTO;
import com.yourfolio.yourfolio.dtos.ImageDTO;
import com.yourfolio.yourfolio.services.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("images")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {

    private final ImageService imageService;
    @PostMapping("/upload")
    public ResponseEntity<ImageDTO> uploadImage(@RequestParam("image") MultipartFile image) {
        return new ResponseEntity<>(imageService.uploadImage(image), HttpStatus.CREATED);
    }

}
