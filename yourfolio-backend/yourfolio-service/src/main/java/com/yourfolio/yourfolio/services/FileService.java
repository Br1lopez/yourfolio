package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.FileEntity;
import com.yourfolio.yourfolio.dtos.FileDTO;
import com.yourfolio.yourfolio.mappers.FileMapper;
import com.yourfolio.yourfolio.repositories.FileRepository;
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
public class FileService {

    private final Environment env;
    private final FileRepository fileRepository;
    private final FileMapper fileMapper;

    public String getRealPath(String filePath){
        String resourcesPath = Thread.currentThread().getContextClassLoader().getResource(".").getFile()
                .replace("target/classes","src/main/resources/public");
        return resourcesPath.contains("backend") ? resourcesPath : "" + filePath;
    }
    public FileDTO uploadImage(MultipartFile image) {
        String uploadDir = env.getProperty("image.upload-dir");
        // Save the image file to a directory on the server
        String fileName = image.getOriginalFilename();
        String imagePath = uploadDir + fileName;
        File imageFile = new File(getRealPath(imagePath));
        try {
            image.transferTo(imageFile);
        } catch (IOException e) {
            System.out.println(e);
        }

        return fileMapper.toDto(
                fileRepository.save(
                        FileEntity.builder()
                                .url(imagePath)
                                .build()));
    }

}
