package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
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
    private PortfolioEntity portfolio;

    @OneToMany(mappedBy = "tab", fetch = FetchType.EAGER)
    private Set<SectionEntity> sections = new LinkedHashSet<>();

}