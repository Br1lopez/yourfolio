package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "element_type")
public class ElementTypeEntity {


    @Id
    @Column(unique = true)
    private String id;

    private String name;

}