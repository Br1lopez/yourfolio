package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.services.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("images")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageController {

    private final ImageService imageService;
    @PostMapping("/upload")
    public String uploadImage(@RequestParam("image") MultipartFile image) {
        return imageService.uploadImage(image);
    }

}
