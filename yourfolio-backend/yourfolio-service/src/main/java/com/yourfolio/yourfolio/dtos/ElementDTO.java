package com.yourfolio.yourfolio.dtos;

import com.yourfolio.yourfolio.dbentities.ElementEntity;
import com.yourfolio.yourfolio.repositories.RelationshipRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO for the {@link com.yourfolio.yourfolio.dbentities.ElementEntity} entity
 */
@Data
@AllArgsConstructor
public class ElementDTO implements Serializable {

    private final Integer id;
    private final String type;
    private final String name;
    private final String description;
    private final FileDTO thumbnailFile;
    private final List<FileDTO> files;

    @Getter(AccessLevel.NONE)
    private final List<ElementDTO> elements;

    private final StyleDTO style;

    public Set<ElementDTO> getElements(RelationshipRepository relationshipRepository) {
        return elements.stream().sorted(
                        (e1, e2) ->
                                relationshipRepository.findByParentIdAndChildId(id, e1.getId())
                                        .compareTo(
                                                relationshipRepository.findByParentIdAndChildId(id, e2.getId())))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }
}