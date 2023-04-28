package com.yourfolio.yourfolio;

import com.yourfolio.yourfolio.controllers.ElementController;
import com.yourfolio.yourfolio.mappers.StyleMapper;
import com.yourfolio.yourfolio.repositories.ElementRepository;
import com.yourfolio.yourfolio.repositories.RelationshipRepository;
import com.yourfolio.yourfolio.repositories.StyleRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@AllArgsConstructor
public class MainApp implements CommandLineRunner {

    private final ElementController elementController;
    private final RelationshipRepository relationshipRepository;
    private final ElementRepository elementRepository;

    private final StyleRepository styleRepository;

    private final StyleMapper styleMapper;

    public static void main(String[] args) {
        SpringApplication.run(MainApp.class, args);
    }

    @Override
    public void run(String... args) {

        System.out.println(styleMapper.toDto(styleRepository.findById(1).get()).getFontFamily());


    }
}
