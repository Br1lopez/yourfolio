package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link com.yourfolio.yourfolio.dbentities.ElementEntity} entity
 */
@Data
public class ElementSaveDTO implements Serializable {
    private final ElementTypeDTO type;
    private final String name;
    private final Integer position;
    private final String description;
    private final FileDTO thumbnailFile;

    private final StyleDTO style;

}