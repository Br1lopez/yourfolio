package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * A DTO for the {@link com.yourfolio.yourfolio.dbentities.ElementEntity} entity
 */
@Data
public class ElementDTO implements Serializable {
    private final Integer id;
    private final String type;
    private final String name;
    private final String description;
    private final FileDTO thumbnailFile;
    private final List<FileDTO> files;

    private final List<ElementDTO> elements;

    private final StyleDTO style;
}