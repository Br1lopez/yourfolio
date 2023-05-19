package com.yourfolio.yourfolio.services;

import com.yourfolio.yourfolio.dbentities.FileEntity;
import com.yourfolio.yourfolio.dtos.FileDTO;
import com.yourfolio.yourfolio.mappers.FileMapper;
import com.yourfolio.yourfolio.repositories.FileRepository;
import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
public class FileService {

    private final Environment env;
    private final FileRepository fileRepository;
    private final FileMapper fileMapper;

    public Optional<String> getExtension(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".")));
    }

    /* Recupera la ruta de la carpeta en la que Spring copia los archivos de resources/public.
    Esta copia se realiza al hacer build. */
    public String getTargetPath(){
        return Thread.currentThread().getContextClassLoader().getResource(".").getFile() + "/public/";
    }

    // Recupera la ruta absoluta de la carpeta resources/build (en caso de no estar la app desplegada)
    public String getResourcesPath(){
        String resourcesPath = Thread.currentThread().getContextClassLoader().getResource(".").getFile()
                .replace("target/classes","src/main/resources/public/");
        return resourcesPath.contains("yourfolio-backend") ? resourcesPath : "";
    }
    public FileDTO uploadImage(MultipartFile image) {
        String uploadDir = env.getProperty("image.upload-dir");
        // Save the image file to a directory on the server
        // TODO: comprobar que no existe un archivo igual y que hay extensión
        String fileName = UUID.randomUUID() + getExtension(image.getOriginalFilename()).get();

        String imagePath = uploadDir + fileName;


        try {
            File imageFile = new File(getResourcesPath() + imagePath);
            image.transferTo(imageFile);

            // Copiamos las imágenes de resource/public a la carpeta target.
            // Spring lo hace automáticamente, pero solo al hacer build.
            if (!Objects.equals(getResourcesPath(), ""))
            {
                File copied = new File(getTargetPath() + imagePath);
                FileUtils.copyFile(imageFile, copied);
            }


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
