package com.yourfolio.yourfolio.dtos;

import com.yourfolio.yourfolio.dbentities.UserEntity;
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
    private FileDTO thumbnailImage;
    private List<FileDTO> files;
    private List<ElementDTO> elements;
    private StyleDTO style;
    private Integer position;
    private UserDTO user;
    private boolean home;
    private boolean hidden;
    }