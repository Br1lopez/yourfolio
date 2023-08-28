package com.yourfolio.yourfolio.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private final Integer id;
    private final String name;
    private final String email;
}