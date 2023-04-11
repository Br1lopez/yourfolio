package com.yourfolio.yourfolio.dbentities;

import com.yourfolio.yourfolio.dbentities.ids.RelationshipEntityId;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@IdClass(RelationshipEntityId.class)
@Table(name = "element_element")
public class RelationshipEntity {

    @Id
    @Column(name = "parent_id")
    private Integer parentId;

    @Id
    @Column(name = "child_id")
    private Integer childId;

    @Column(name = "position")
    private Integer position;


}

