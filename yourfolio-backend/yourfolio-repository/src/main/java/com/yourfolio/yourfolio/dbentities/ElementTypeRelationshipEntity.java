package com.yourfolio.yourfolio.dbentities;

import com.yourfolio.yourfolio.dbentities.ids.ElementTypeRelationshipEntityId;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@IdClass(ElementTypeRelationshipEntityId.class)
@Table(name = "element_type_children")
public class ElementTypeRelationshipEntity {

    @Id
    @Column(name = "parent_id")
    private String parentId;

    @Id
    @Column(name = "child_id")
    private String childId;

}


