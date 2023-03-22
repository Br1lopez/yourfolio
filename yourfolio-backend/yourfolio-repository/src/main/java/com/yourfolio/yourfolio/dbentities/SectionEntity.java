package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "section")
public class SectionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @JoinTable(name = "section_project",
            joinColumns = @JoinColumn(name = "section_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id"))
    private Set<ProjectEntity> projects = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tab_id")
    private TabEntity tab;

}