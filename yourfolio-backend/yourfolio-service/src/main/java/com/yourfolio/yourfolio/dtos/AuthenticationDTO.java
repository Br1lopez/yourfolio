package com.yourfolio.yourfolio.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthenticationDTO {
    boolean success;
    String token;
}
