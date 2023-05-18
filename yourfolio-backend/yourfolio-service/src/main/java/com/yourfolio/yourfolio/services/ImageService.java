package com.yourfolio.yourfolio.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@Transactional
@AllArgsConstructor
public class ImageService {

    private final Environment env;
    public String uploadImage(MultipartFile image) {
        String uploadDir = env.getProperty("image.upload-dir");
        // Save the image file to a directory on the server
        String fileName = image.getOriginalFilename();
        String imagePath = uploadDir + fileName;
        File imageFile = new File(imagePath);
        try {
            image.transferTo(imageFile);
        } catch (IOException e) {
            // Handle exception
        }

        // Save the path to the image file in the database


        return "Image uploaded successfully";
    }

}
