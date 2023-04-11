package com.yourfolio.yourfolio;

import com.yourfolio.yourfolio.controllers.ElementController;
import com.yourfolio.yourfolio.dbentities.RelationshipEntity;
import com.yourfolio.yourfolio.dbentities.ids.RelationshipEntityId;
import com.yourfolio.yourfolio.repositories.RelationshipRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@AllArgsConstructor
public class MainApp implements CommandLineRunner {

    private final ElementController controller;
    private final RelationshipRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(MainApp.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println(controller.getPortfolioById(1));
        System.out.println(
                repository.findByParentIdAndChildId(1,2));
    }

}
