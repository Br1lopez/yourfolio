package com.yourfolio.yourfolio.dtos;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link com.yourfolio.yourfolio.dbentities.ElementEntity} entity
 */
@Data
public class ElementSaveDTO implements Serializable {
    private final String typeId;
    private final String name;
    private final Integer position;
    private final String description;
    private final FileDTO thumbnailFile;
    private List<FileDTO> files;
    private final StyleDTO style;
    private final UserDTO user;
    private boolean home;
    private boolean hidden;
}