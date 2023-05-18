package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.ImageEntity;
import com.yourfolio.yourfolio.dtos.ImageDTO;
import com.yourfolio.yourfolio.mappers.ImageMapper;
import com.yourfolio.yourfolio.repositories.ImageRepository;
import lombok.AllArgsConstructor;
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
    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    public ImageDTO uploadImage(MultipartFile image) {
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


        return imageMapper.toImageDTO(
                imageRepository.save(
                        ImageEntity.builder()
                                .url(imagePath)
                                .build()));
    }

}
