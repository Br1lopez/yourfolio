package com.yourfolio.yourfolio.dtos;

import lombok.Data;

@Data
public class ImageDTO {
    private final Integer id;
    private final String url;
    private final String description;
}