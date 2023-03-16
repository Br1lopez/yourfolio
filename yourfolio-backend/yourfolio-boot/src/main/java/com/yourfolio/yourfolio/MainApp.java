package com.yourfolio.yourfolio;

import com.yourfolio.yourfolio.infrastructure.repositories.PortfolioRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@AllArgsConstructor
public class MainApp implements CommandLineRunner {

    private final PortfolioRepository repo;
    public static void main(String[] args) {
        SpringApplication.run(MainApp.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println(repo.findById(1).get());
    }

}
