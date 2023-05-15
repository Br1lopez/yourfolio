package com.yourfolio.yourfolio.dbentities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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