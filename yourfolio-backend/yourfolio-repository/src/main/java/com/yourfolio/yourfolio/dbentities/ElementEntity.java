package com.yourfolio.yourfolio.dbentities;

import com.yourfolio.yourfolio.repositories.RelationshipRepository;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import com.yourfolio.yourfolio.dbentities.RelationshipEntity;
import org.springframework.beans.factory.annotation.Autowired;

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

    @Lob
    @Column(name = "type")
    private String type;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail_file_id")
    private FileEntity thumbnailFile;


    @ManyToMany
    @Getter(AccessLevel.NONE)
    @JoinTable(name = "element_element",
            joinColumns = @JoinColumn(name = "parent_id"),
            inverseJoinColumns = @JoinColumn(name = "child_id"))
    @Setter(AccessLevel.NONE)
    private Set<ElementEntity> elements = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "element_file",
            joinColumns = @JoinColumn(name = "element_id"),
            inverseJoinColumns = @JoinColumn(name = "file_id"))

    private Set<FileEntity> files = new LinkedHashSet<>();

    @OneToOne(mappedBy = "portfolio", orphanRemoval = true)
    private StyleEntity style;



    public Set<ElementEntity> getElements(RelationshipRepository relationshipRepository) {
        return elements.stream().sorted(
                (e1, e2) ->
                        relationshipRepository.findByParentIdAndChildId(id, e1.getId())
                                .compareTo(
                                        relationshipRepository.findByParentIdAndChildId(id, e2.getId())))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

}