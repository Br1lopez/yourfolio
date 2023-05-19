package com.yourfolio.yourfolio.controllers;

import com.yourfolio.yourfolio.dtos.FileDTO;
import com.yourfolio.yourfolio.services.FileService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("files")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FileController {

    private final FileService fileService;
    @PostMapping("/upload")
    public ResponseEntity<FileDTO> uploadImage(@RequestParam("image") MultipartFile image) {
        return new ResponseEntity<>(fileService.uploadImage(image), HttpStatus.CREATED);
    }

}
