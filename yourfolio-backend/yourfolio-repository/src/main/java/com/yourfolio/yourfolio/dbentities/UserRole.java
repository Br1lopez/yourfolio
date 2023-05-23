package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@AllArgsConstructor
public class UserRole implements GrantedAuthority {

    private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}