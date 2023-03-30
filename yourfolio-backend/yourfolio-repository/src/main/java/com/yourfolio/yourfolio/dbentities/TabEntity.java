package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "tab")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TabEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "tab_position")
    private Integer position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id")
    private PortfolioEntity portfolio;


    @OneToMany(mappedBy = "tab", fetch = FetchType.EAGER)
    private Set<SectionEntity> sections = new LinkedHashSet<>();

}