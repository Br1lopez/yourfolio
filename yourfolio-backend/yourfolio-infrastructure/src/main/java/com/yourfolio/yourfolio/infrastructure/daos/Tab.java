package com.yourfolio.yourfolio.infrastructure.daos;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tab")
public class Tab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "template")
    private String template;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

}