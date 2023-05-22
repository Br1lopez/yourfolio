package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.*;


@Builder
@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    //TODO: decidir si quitar apellidos o no

//    @Column(name = "surname1")
//    private String surname1;
//
//    @Column(name = "surname2")
//    private String surname2;

    @Column(name = "password", length = 32)
    private String password;

}