package com.yourfolio.yourfolio;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link com.yourfolio.yourfolio.dbentities.FileEntity} entity
 */
@Data
public class FileDTO implements Serializable {
    private final Integer id;
    private final String url;
    private final String description;
}