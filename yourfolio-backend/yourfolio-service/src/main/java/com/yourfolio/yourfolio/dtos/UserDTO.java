package com.yourfolio.yourfolio.dtos;

import lombok.Data;

@Data
public class UserDTO {
    private final Integer id;
    private final String name;
    private final String email;
}