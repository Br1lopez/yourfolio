package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

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
    private Set<FileEntity> files = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "section_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "section_id"))
    private Set<SectionEntity> sections = new LinkedHashSet<>();


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FileEntity getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(FileEntity thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Set<FileEntity> getFiles() {
        return files;
    }

    public void setFiles(Set<FileEntity> files) {
        this.files = files;
    }

    public Set<SectionEntity> getSections() {
        return sections;
    }

    public void setSections(Set<SectionEntity> sections) {
        this.sections = sections;
    }
}