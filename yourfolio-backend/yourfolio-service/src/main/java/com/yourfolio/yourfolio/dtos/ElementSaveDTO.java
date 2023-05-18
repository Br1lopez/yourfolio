package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link com.yourfolio.yourfolio.dbentities.ElementEntity} entity
 */
@Data
public class ElementSaveDTO implements Serializable {
    private final String typeId;
    private final String name;
    private final Integer position;
    private final String description;
    private final ImageDTO thumbnailFile;

    private final StyleDTO style;

}