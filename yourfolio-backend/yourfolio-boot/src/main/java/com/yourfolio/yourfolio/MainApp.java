package com.yourfolio.yourfolio;

import com.yourfolio.yourfolio.controllers.ElementController;
import com.yourfolio.yourfolio.repositories.ElementRepository;
import com.yourfolio.yourfolio.repositories.RelationshipRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@AllArgsConstructor
public class MainApp implements CommandLineRunner {

    private final ElementController elementController;
    private final RelationshipRepository relationshipRepository;
    private final ElementRepository elementRepository;

    public static void main(String[] args) {
        SpringApplication.run(MainApp.class, args);
    }

    @Override
    public void run(String... args) {

        for (int i = 0; i < 8; i++) {
            System.out.println(elementController.getElementById(1));
        }


    }
}
