package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tab")
public class TabEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private PortfolioEntity portfolioEntity;

}