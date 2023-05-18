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
    private ImageEntity thumbnailImage;


    @ManyToMany
    @JoinTable(name = "element_children",
            joinColumns = @JoinColumn(name = "parent_id"),
            inverseJoinColumns = @JoinColumn(name = "child_id"))
    private Set<ElementEntity> elements = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "element_image",
            joinColumns = @JoinColumn(name = "element_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))

    private Set<ImageEntity> images = new LinkedHashSet<>();

    @OneToOne(mappedBy = "portfolio", orphanRemoval = true)
    private StyleEntity style;

}