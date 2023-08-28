package com.yourfolio.yourfolio.dbentities;

import com.yourfolio.yourfolio.dbentities.ids.ElementRelationshipEntityId;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@IdClass(ElementRelationshipEntityId.class)
@Table(name = "element_children")
public class ElementRelationshipEntity implements Comparable<ElementRelationshipEntity> {

    @Id
    @Column(name = "parent_id")
    private Integer parentId;

    @Id
    @Column(name = "child_id")
    private Integer childId;

    @Column(name = "position")
    private Integer position;

    @Override
    public int compareTo(ElementRelationshipEntity o) {
        return this.getPosition() - o.getPosition();
    }
}


