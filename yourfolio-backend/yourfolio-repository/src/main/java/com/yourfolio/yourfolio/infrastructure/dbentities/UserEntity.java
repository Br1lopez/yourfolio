package com.yourfolio.yourfolio.infrastructure.dbentities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "surname1")
    private String surname1;

    @Column(name = "surname2")
    private String surname2;

    @Column(name = "password", length = 32)
    private String password;

}