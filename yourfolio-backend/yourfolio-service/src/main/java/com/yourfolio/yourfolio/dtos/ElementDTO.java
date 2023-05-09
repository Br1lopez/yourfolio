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

    private Integer id;
    private ElementTypeDTO type;
    private String name;
    private String description;
    private FileDTO thumbnailFile;
    private List<FileDTO> files;

    private List<ElementDTO> elements;

    //TODO forzar a enviarlo
    private StyleDTO style;

    private Integer position;

    }