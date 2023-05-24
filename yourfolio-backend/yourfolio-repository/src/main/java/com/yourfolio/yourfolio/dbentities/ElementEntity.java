package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "element")
public class ElementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "element_type_id")
    private ElementTypeEntity type;

    @Column(name = "name")
    private String name;


    @Column(name = "description")
    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail_image_id")
    private FileEntity thumbnailImage;


    @ManyToMany
    @JoinTable(name = "element_children",
            joinColumns = @JoinColumn(name = "parent_id"),
            inverseJoinColumns = @JoinColumn(name = "child_id"))
    private Set<ElementEntity> elements = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "element_file",
            joinColumns = @JoinColumn(name = "element_id"),
            inverseJoinColumns = @JoinColumn(name = "file_id"))

    private Set<FileEntity> files = new LinkedHashSet<>();

    @OneToOne(mappedBy = "portfolio", orphanRemoval = true)
    private StyleEntity style;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}