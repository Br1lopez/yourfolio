package com.yourfolio.yourfolio.dtos;

import lombok.Data;

@Data
public class UserSaveDTO {
    private final String name;
    private final String email;
    private final String password;
}