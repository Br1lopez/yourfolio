package com.yourfolio.yourfolio.infrastructure.dbentities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "project")
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail_id")
    private FileEntity thumbnail;

    @ManyToMany
    @JoinTable(name = "file_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "file_id"))
    private Set<FileEntity> fileEntities = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "section_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "section_id"))
    private Set<SectionEntity> sectionEntities = new LinkedHashSet<>();

}