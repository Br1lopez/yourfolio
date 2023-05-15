package com.yourfolio.yourfolio;

import com.yourfolio.yourfolio.controllers.ElementController;
import com.yourfolio.yourfolio.mappers.StyleMapper;
import com.yourfolio.yourfolio.repositories.ElementRelationshipRepository;
import com.yourfolio.yourfolio.repositories.ElementRepository;
import com.yourfolio.yourfolio.repositories.ElementTypeRepository;
import com.yourfolio.yourfolio.repositories.StyleRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@AllArgsConstructor
public class MainApp implements CommandLineRunner {

    private final ElementController elementController;
    private final ElementRelationshipRepository elementRelationshipRepository;
    private final ElementRepository elementRepository;

    private final StyleRepository styleRepository;
    private final ElementTypeRepository elementTypeRepository;

    private final StyleMapper styleMapper;

    public static void main(String[] args) {
        SpringApplication.run(MainApp.class, args);
    }

    @Override
    public void run(String... args) {


    }
}
