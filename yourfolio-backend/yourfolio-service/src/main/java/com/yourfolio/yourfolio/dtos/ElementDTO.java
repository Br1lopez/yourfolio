package com.yourfolio.yourfolio.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

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
    private ImageDTO thumbnailImage;
    private List<ImageDTO> images;
    private List<ElementDTO> elements;
    private StyleDTO style;
    private Integer position;

    }